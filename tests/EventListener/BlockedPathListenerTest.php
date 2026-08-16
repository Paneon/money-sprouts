<?php

declare(strict_types=1);

namespace App\Tests\EventListener;

use App\EventListener\BlockedPathListener;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class BlockedPathListenerTest extends TestCase
{
    /**
     * @dataProvider blockedPaths
     */
    public function testBlockedPathShortCircuitsWithNotFound(string $uri): void
    {
        $event = $this->createRequestEvent($uri);
        (new BlockedPathListener())($event);

        $response = $event->getResponse();
        self::assertInstanceOf(Response::class, $response);
        self::assertSame(Response::HTTP_NOT_FOUND, $response->getStatusCode());
        // RequestEvent::setResponse() stops propagation -> router and firewall no longer run.
        self::assertTrue($event->isPropagationStopped());
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function blockedPaths(): iterable
    {
        yield 'wp-admin probe from sentry issue' => ['/wp-admin/images/admin.php'];
        yield 'wp-content' => ['/wp-content/plugins/foo.php'];
        yield 'wp-login' => ['/wp-login.php'];
        yield 'xmlrpc' => ['/xmlrpc.php'];
        yield 'dotenv' => ['/.env'];
        yield 'git config' => ['/.git/config'];
        yield 'phpmyadmin' => ['/phpmyadmin/index.php'];
        yield 'mixed case' => ['/WP-Admin/setup-config.php'];
    }

    /**
     * @dataProvider allowedPaths
     */
    public function testAllowedPathIsUntouched(string $uri): void
    {
        $event = $this->createRequestEvent($uri);
        (new BlockedPathListener())($event);

        self::assertNull($event->getResponse());
        self::assertFalse($event->isPropagationStopped());
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function allowedPaths(): iterable
    {
        yield 'root' => ['/'];
        yield 'login' => ['/login'];
        yield 'dashboard' => ['/dashboard'];
        yield 'api resource' => ['/api/accounts/1'];
        yield 'build asset' => ['/build/main.123456.js'];
        // Proves the /administrator prefix does not also block the real /admin route.
        yield 'admin area' => ['/admin'];
    }

    public function testSubRequestIsNeverBlocked(): void
    {
        $event = $this->createRequestEvent('/wp-admin/images/admin.php', HttpKernelInterface::SUB_REQUEST);
        (new BlockedPathListener())($event);

        self::assertNull($event->getResponse());
    }

    private function createRequestEvent(
        string $uri,
        int $requestType = HttpKernelInterface::MAIN_REQUEST
    ): RequestEvent {
        return new RequestEvent(
            $this->createMock(HttpKernelInterface::class),
            Request::create($uri),
            $requestType
        );
    }
}

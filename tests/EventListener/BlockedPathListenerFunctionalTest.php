<?php

declare(strict_types=1);

namespace App\Tests\EventListener;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

/**
 * Binds the prefix list to real requests going through the kernel.
 *
 * The unit test covers the listener in isolation; this one catches the case where a future
 * route starts with a blocked prefix, or where the listener drops out of the container.
 */
class BlockedPathListenerFunctionalTest extends WebTestCase
{
    /**
     * @dataProvider scannerPaths
     */
    public function testScannerPathIsAnsweredWithNotFound(string $uri): void
    {
        $client = static::createClient();
        $client->request('GET', $uri);

        self::assertResponseStatusCodeSame(Response::HTTP_NOT_FOUND);
        self::assertSame('', $client->getResponse()->getContent());
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function scannerPaths(): iterable
    {
        yield 'wp-admin probe from sentry issue' => ['/wp-admin/images/admin.php'];
        yield 'wp-login' => ['/wp-login.php'];
        yield 'xmlrpc' => ['/xmlrpc.php'];
    }

    public function testRealRouteStillReachesTheApplication(): void
    {
        $client = static::createClient();
        $client->request('GET', '/login');

        // Not the listener's empty 404 body: /login must pass through router and firewall.
        self::assertResponseIsSuccessful();
        self::assertNotSame('', $client->getResponse()->getContent());
    }
}

<?php

declare(strict_types=1);

namespace App\Tests\Sentry;

use App\Sentry\AuthenticatedUserEventFilter;
use PHPUnit\Framework\TestCase;
use Sentry\Event;
use Sentry\EventHint;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticatedUserEventFilterTest extends TestCase
{
    public function testDropsEventForAnonymousHttpRequest(): void
    {
        $event = Event::createEvent();
        $filter = $this->createFilter(null, Request::create('/wp-admin/images/admin.php'));

        self::assertNull($filter($event, EventHint::fromArray([])));
    }

    public function testKeepsEventForAuthenticatedHttpRequest(): void
    {
        $event = Event::createEvent();
        $filter = $this->createFilter($this->tokenWithUser(), Request::create('/dashboard'));

        self::assertSame($event, $filter($event, EventHint::fromArray([])));
    }

    public function testKeepsEventOutsideHttpContext(): void
    {
        // Console-Command oder Messenger-Worker: kein Request, kein Token - muss trotzdem melden.
        $event = Event::createEvent();
        $filter = $this->createFilter(null, null);

        self::assertSame($event, $filter($event, EventHint::fromArray([])));
    }

    public function testDropsEventWhenTokenCarriesNoUser(): void
    {
        $token = $this->createMock(TokenInterface::class);
        $token->method('getUser')->willReturn(null);

        $event = Event::createEvent();
        $filter = $this->createFilter($token, Request::create('/login'));

        self::assertNull($filter($event, EventHint::fromArray([])));
    }

    public function testHandlesMissingHint(): void
    {
        $event = Event::createEvent();
        $filter = $this->createFilter($this->tokenWithUser(), Request::create('/dashboard'));

        self::assertSame($event, $filter($event, null));
    }

    private function createFilter(?TokenInterface $token, ?Request $request): AuthenticatedUserEventFilter
    {
        $tokenStorage = $this->createMock(TokenStorageInterface::class);
        $tokenStorage->method('getToken')->willReturn($token);

        $requestStack = new RequestStack();
        if ($request instanceof Request) {
            $requestStack->push($request);
        }

        return new AuthenticatedUserEventFilter($tokenStorage, $requestStack);
    }

    private function tokenWithUser(): TokenInterface
    {
        $token = $this->createMock(TokenInterface::class);
        $token->method('getUser')->willReturn($this->createMock(UserInterface::class));

        return $token;
    }
}

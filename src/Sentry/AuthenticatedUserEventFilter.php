<?php

declare(strict_types=1);

namespace App\Sentry;

use Sentry\Event;
use Sentry\EventHint;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Verdirbt Sentry-Events, die aus einem HTTP-Request ohne authentifizierten User stammen.
 *
 * Verdrahtet als sentry.options.before_send und damit fuer beide Sende-Pfade wirksam
 * (Sentry-ErrorListener und Monolog-Handler laufen beide durch Client::processEvent()).
 *
 * Achtung: RouterListener (Prioritaet 32) laeuft vor der Firewall (Prioritaet 8). Zum
 * Zeitpunkt einer Routing-NotFoundHttpException existiert daher nie ein Token - genau
 * das laesst die 404er von Scannern verschwinden.
 */
final class AuthenticatedUserEventFilter
{
    public function __construct(
        private readonly TokenStorageInterface $tokenStorage,
        private readonly RequestStack $requestStack,
    ) {
    }

    public function __invoke(Event $event, ?EventHint $hint = null): ?Event
    {
        // Console-Commands und Messenger-Worker haben nie ein Token. Hier zu filtern
        // wuerde Cron- und Worker-Fehler unsichtbar machen.
        if ($this->requestStack->getMainRequest() === null) {
            return $event;
        }

        $token = $this->tokenStorage->getToken();

        if ($token === null || !$token->getUser() instanceof UserInterface) {
            return null;
        }

        return $event;
    }
}

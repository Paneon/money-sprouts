<?php

declare(strict_types=1);

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Beantwortet bekannte Scanner-Pfade direkt mit 404.
 *
 * Prioritaet 512 laeuft vor RouterListener (32) und Firewall (8). Dadurch entsteht gar
 * keine NotFoundHttpException, es wird nichts geloggt und Sentry sieht den Request nie.
 *
 * Das Matching ist ein reiner Praefix-Vergleich auf dem kleingeschriebenen pathInfo und
 * damit bewusst grob: /wp-admin-report waere ebenfalls geblockt. Vor dem Aufnehmen eines
 * neuen Praefix daher immer `bin/console debug:router` dagegen pruefen.
 */
#[AsEventListener(event: KernelEvents::REQUEST, priority: 512)]
final class BlockedPathListener
{
    /**
     * @var list<string>
     */
    public const BLOCKED_PREFIXES = [
        '/wp-admin',
        '/wp-content',
        '/wp-includes',
        '/wp-login',
        '/wordpress',
        '/xmlrpc.php',
        '/.env',
        '/.git',
        '/phpmyadmin',
        '/administrator',
    ];

    public function __invoke(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $path = strtolower($event->getRequest()->getPathInfo());

        foreach (self::BLOCKED_PREFIXES as $prefix) {
            if (str_starts_with($path, $prefix)) {
                $event->setResponse(new Response('', Response::HTTP_NOT_FOUND));

                return;
            }
        }
    }
}

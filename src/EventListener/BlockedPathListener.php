<?php

declare(strict_types=1);

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Answers known scanner paths with a bare 404.
 *
 * Priority 512 runs ahead of RouterListener (32) and the firewall (8), so no
 * NotFoundHttpException is created, nothing is logged, and Sentry never sees the request.
 * It also runs ahead of Sentry's TracingRequestListener (4), so blocked requests do not
 * open a performance transaction either.
 *
 * Running this early also means it precedes ValidateRequestListener (256): a request with an
 * inconsistent Host header hitting a blocked path now gets a 404 instead of a 400. Harmless
 * here, since getPathInfo() does not depend on the Host header.
 *
 * Matching is a plain prefix comparison on the lowercased pathInfo and therefore deliberately
 * coarse: /wp-admin-report would be blocked too. Always check a new prefix against
 * `bin/console debug:router` before adding it.
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

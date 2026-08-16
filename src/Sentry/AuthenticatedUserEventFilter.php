<?php

declare(strict_types=1);

namespace App\Sentry;

use Sentry\Event;
use Sentry\EventHint;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Discards Sentry events originating from an HTTP request without an authenticated user.
 *
 * Wired as sentry.options.before_send, so it covers both reporting paths: the Sentry error
 * listener and the Monolog handler both pass through Client::processEvent().
 *
 * Note that RouterListener (priority 32) runs before the firewall (priority 8), so no token
 * exists yet when routing throws a NotFoundHttpException. That is precisely what makes the
 * scanner 404s disappear.
 */
final class AuthenticatedUserEventFilter
{
    public function __construct(
        // Deliberately the untracked storage: security.token_storage is UsageTrackingTokenStorage,
        // whose getToken() touches the session (getMetadataBag) and throws SessionNotFoundException
        // for a request without one. Sentry invokes before_send unguarded, and a reporting path
        // must neither mutate session state nor throw.
        #[Autowire(service: 'security.untracked_token_storage')]
        private readonly TokenStorageInterface $tokenStorage,
        private readonly RequestStack $requestStack,
    ) {
    }

    public function __invoke(Event $event, ?EventHint $hint = null): ?Event
    {
        // Console commands and messenger workers never carry a token. Filtering here would
        // make cron and worker failures invisible.
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

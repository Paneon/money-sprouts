<?php declare(strict_types=1);

namespace App\Service;

use Monolog\LogRecord;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sentry\Event;
use Sentry\EventHint;
use Symfony\Component\HttpFoundation\Request;

class ErrorFilterProcessor
{
    private array $ignoredPaths = [
        '/js/twint_ch.js',
        // Add more paths to ignore here as needed
    ];

    public function __construct()
    {
        // Register Sentry error filter
        \Sentry\addErrorFilter(function(Event $event, ?EventHint $hint): ?Event {
            if ($hint !== null && $hint->exception instanceof NotFoundHttpException) {
                $request = $hint->exception->getRequest();
                if ($request) {
                    $path = $request->getPathInfo();
                    foreach ($this->ignoredPaths as $ignoredPath) {
                        if (str_contains($path, $ignoredPath)) {
                            return null; // Returning null prevents the event from being sent to Sentry
                        }
                    }
                }
            }
            return $event;
        });
    }

    public function __invoke(LogRecord $record): LogRecord
    {
        if (!$this->shouldProcessRecord($record)) {
            $record->level = \Monolog\Level::Debug;  // Downgrade to debug level
        }

        return $record;
    }

    private function shouldProcessRecord(LogRecord $record): bool
    {
        $exception = $this->getExceptionFromRecord($record);
        if (!$exception instanceof NotFoundHttpException) {
            return true;
        }

        return !$this->isIgnoredPath($exception->getRequest());
    }

    private function getExceptionFromRecord(LogRecord $record): ?NotFoundHttpException
    {
        $exception = $record->context['exception'] ?? null;
        return $exception instanceof NotFoundHttpException ? $exception : null;
    }

    private function isIgnoredPath(?Request $request): bool
    {
        if (!$request) {
            return false;
        }

        $path = $request->getPathInfo();
        return $this->pathMatchesIgnoredPaths($path);
    }

    private function pathMatchesIgnoredPaths(string $path): bool
    {
        foreach ($this->ignoredPaths as $ignoredPath) {
            if (str_contains($path, $ignoredPath)) {
                return true;
            }
        }
        return false;
    }
} 
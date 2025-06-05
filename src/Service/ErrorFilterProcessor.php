<?php

namespace App\Service;

use Monolog\LogRecord;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sentry\Event;
use Sentry\EventHint;

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
        $context = $record->context;
        $exception = $context['exception'] ?? null;

        // If there's no exception, process the record normally
        if (!$exception) {
            return true;
        }

        // Check if it's a NotFoundHttpException
        if ($exception instanceof NotFoundHttpException) {
            $request = $exception->getRequest();
            if ($request) {
                $path = $request->getPathInfo();
                // Check if the path matches any of our ignored paths
                foreach ($this->ignoredPaths as $ignoredPath) {
                    if (str_contains($path, $ignoredPath)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
} 
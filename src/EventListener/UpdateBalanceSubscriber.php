<?php

declare(strict_types=1);

namespace App\EventListener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\PostFlushEventArgs;
use Doctrine\ORM\Events;

class UpdateBalanceSubscriber implements EventSubscriber
{
    private TransactionListener $transactionListener;

    public function __construct(TransactionListener $transactionListener)
    {
        $this->transactionListener = $transactionListener;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::postFlush];
    }

    public function postFlush(PostFlushEventArgs $args): void
    {
        $objectManager = $args->getObjectManager();
        $transactions = $this->transactionListener->getUpdatedTransactions();

        foreach ($transactions as $transaction) {
            $user = $transaction->getUser();
            if ($transaction->isApplied()) {
                $balance = $user->getBalance() + $transaction->getValue();
            } else {
                $balance = $user->getBalance() - $transaction->getValue();
            }
            $user->setBalance($balance);
            $objectManager->persist($user);
        }

        if (!empty($transactions)) {
            $this->transactionListener->clearUpdatedTransactions();
            $objectManager->flush();
        }
    }
}

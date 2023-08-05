<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\Transaction;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsDoctrineListener(event: Events::prePersist, priority: 500, connection: 'default')]
#[AsDoctrineListener(event: Events::preUpdate, priority: 500, connection: 'default')]
class TransactionListener
{
    /**
     * @var Transaction[] $updatedTransactions
     */
    private array $updatedTransactions = [];

    public function prePersist(PrePersistEventArgs $args): void
    {
        if (!($args->getObject() instanceof Transaction)) {
            return;
        }

        /** @var Transaction $transaction */
        $transaction = $args->getObject();

        if ($transaction->isApplied()) {
            $this->updatedTransactions[] = $transaction;
        }
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        if (!($args->getObject() instanceof Transaction)) {
            return;
        }

        /** @var Transaction $transaction */
        $transaction = $args->getObject();

        if ($args->getOldValue('applied') !== $args->getNewValue('applied')) {
            $this->updatedTransactions[] = $transaction;
        }
    }

    public function getUpdatedTransactions(): array
    {
        return $this->updatedTransactions;
    }

    public function clearUpdatedTransactions(): void
    {
        $this->updatedTransactions = [];
    }
}

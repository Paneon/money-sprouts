<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Transaction;
use App\Enum\TransactionType;
use Zenstruck\Foundry\ModelFactory;

/**
 * @extends ModelFactory<Transaction>
 */
final class TransactionFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     */
    public function __construct()
    {
        parent::__construct();
    }

    protected static function getClass(): string
    {
        return Transaction::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'applied' => self::faker()->boolean(),
            'title' => self::faker()->text(180),
            'type' => self::faker()->randomElement(TransactionType::getConstants()),
            'user' => UserFactory::random(),
            'value' => self::faker()->numberBetween(0.49, 12.00),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this// ->afterInstantiate(function(Transaction $transaction): void {})
            ;
    }
}

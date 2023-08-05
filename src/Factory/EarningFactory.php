<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Transaction;
use Zenstruck\Foundry\ModelFactory;

/**
 * @extends ModelFactory<Transaction>
 */
final class EarningFactory extends ModelFactory
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
            'applied' => false,
            'title' => self::faker()->realText(80),
            'user' => UserFactory::random(),
            'category' => CategoryFactory::find(['name' => 'Pocket Money']),
            'value' => self::faker()->numberBetween(100, 1000),
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

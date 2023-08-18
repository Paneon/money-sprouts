<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Transaction;
use Zenstruck\Foundry\ModelFactory;

/**
 * @extends ModelFactory<Transaction>
 */
final class ExpenseFactory extends ModelFactory
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
            'title' => self::faker()->randomElement([
                'Book', 'Comic', 'Pokemon animal', 'Sweets', 'Sticker', 'Toy', 'Toy Car'
            ]),
            'user' => UserFactory::random(),
            'category' => CategoryFactory::find(['name' => 'Expense']),
            'value' => self::faker()->numberBetween(-1500, -49),
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

<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Account;
use App\Entity\Transaction;
use DateTime;
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

    public static function createPocketMoney(Account $account, ?DateTime $effectiveOn = null): Transaction
    {
        $pocketMoney = new Transaction();
        $pocketMoney
            ->setPocketMoney(true)
            ->setAccount($account)
            ->setEffectiveOn($effectiveOn)
            ->setTitle('Pocket Money')
            ->setApplied(true)
            ->setValue($account->getAllowance());
        return $pocketMoney;
    }

    public function pocketMoney(Account $account, ?DateTime $effectiveOn): self
    {
        return $this->addState([
            'title' => 'Pocket Money',
            'pocketMoney' => true,
            'effectiveOn' => $effectiveOn,
            'category' => CategoryFactory::find(['name' => 'Pocket Money']),
            'applied' => true,
            'account' => $account,
            'value' => $account->getAllowance(),
        ]);
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'applied' => false,
            'title' => 'Pocket Money',
            'account' => AccountFactory::random(),
            'effectiveOn' => null,
            'pocketMoney' => true,
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

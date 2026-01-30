<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Account;
use App\Repository\AccountRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Account>
 *
 * @method        Account|Proxy                     create(array|callable $attributes = [])
 * @method static Account|Proxy                     createOne(array $attributes = [])
 * @method static Account|Proxy                     find(object|array|mixed $criteria)
 * @method static Account|Proxy                     findOrCreate(array $attributes)
 * @method static Account|Proxy                     first(string $sortedField = 'id')
 * @method static Account|Proxy                     last(string $sortedField = 'id')
 * @method static Account|Proxy                     random(array $attributes = [])
 * @method static Account|Proxy                     randomOrCreate(array $attributes = [])
 * @method static AccountRepository|RepositoryProxy repository()
 * @method static Account[]|Proxy[]                 all()
 * @method static Account[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Account[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Account[]|Proxy[]                 findBy(array $attributes)
 * @method static Account[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Account[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<Account> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<Account> createOne(array $attributes = [])
 * @phpstan-method static Proxy<Account> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<Account> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<Account> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<Account> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<Account> random(array $attributes = [])
 * @phpstan-method static Proxy<Account> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<Account> repository()
 * @phpstan-method static list<Proxy<Account>> all()
 */
final class AccountFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'allowance' => self::faker()->numberBetween(100, 1000),
            'balance' => 0,
            'name' => self::faker()->name,
            'user' => UserFactory::new(),
        ];
    }

    public function withAllowance(int $allowance): self
    {
        return $this->addState([
            'allowance' => $allowance,
        ]);
    }

    public function nextPaydayYesterday(): self
    {
        return $this->addState([
            'nextPayday' => new \DateTime('-1 day'),
        ]);
    }

    public function nextPaydayTwoWeeksAgo(): self
    {
        return $this->addState([
            'nextPayday' => new \DateTime('-12 days'),
        ]);
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this// ->afterInstantiate(function(Account $account): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Account::class;
    }
}

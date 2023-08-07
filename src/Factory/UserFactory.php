<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\User;
use App\Enum\UserRole;
use App\Repository\UserRepository;
use DateTime;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<User>
 *
 * @method        User|Proxy                     create(array|callable $attributes = [])
 * @method static User|Proxy                     createOne(array $attributes = [])
 * @method static User|Proxy                     find(object|array|mixed $criteria)
 * @method static User|Proxy                     findOrCreate(array $attributes)
 * @method static User|Proxy                     first(string $sortedField = 'id')
 * @method static User|Proxy                     last(string $sortedField = 'id')
 * @method static User|Proxy                     random(array $attributes = [])
 * @method static User|Proxy                     randomOrCreate(array $attributes = [])
 * @method static UserRepository|RepositoryProxy repository()
 * @method static User[]|Proxy[]                 all()
 * @method static User[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static User[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static User[]|Proxy[]                 findBy(array $attributes)
 * @method static User[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static User[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class UserFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     */
    public function __construct(protected UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct();
    }

    protected static function getClass(): string
    {
        return User::class;
    }

    public function admin(string $password): self
    {
        return $this->addState([
            'roles' => [UserRole::ADMIN],
            'password' => $password
        ]);
    }

    public function nextPaydayYesterday(): self
    {
        return $this->addState([
            'nextPayday' => new DateTime('-1 day'),
        ]);
    }

    public function nextPaydayTwoWeeksAgo(): self
    {
        return $this->addState([
            'nextPayday' => new DateTime('-12 days'),
        ]);
    }

    public function tracked(): self
    {
        return $this->addState(['tracked' => true]);
    }

    public function withAllowance(int $allowance): self
    {
        return $this->addState([
            'allowance' => $allowance,
        ]);
    }

    public function withAvatar(): self
    {
        return $this->addState([
            'avatar' => AvatarFactory::random(),
        ]);
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'allowance' => self::faker()->numberBetween(100, 1000),
            'email' => self::faker()->email,
            'name' => self::faker()->firstName,
            'password' => self::faker()->password,
            'avatar' => null,
            'roles' => [UserRole::USER],
            'tracked' => false,
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            ->afterInstantiate(function (User $user) {
                $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));
            });
    }
}

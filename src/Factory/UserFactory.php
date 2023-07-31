<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\User;
use App\Enum\UserRole;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\ModelFactory;

/**
 * @extends ModelFactory<User>
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

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'allowance' => self::faker()->numberBetween(1, 10),
            'email' => self::faker()->email,
            'name' => self::faker()->firstName,
            'password' => self::faker()->password,
            'roles' => [UserRole::USER],
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

<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use App\Enum\UserRole;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $admin = new User();
        $admin->setEmail($_ENV['ADMIN_MAIL']);
        $admin->setRoles([UserRole::ADMIN]);

        $password = $this->passwordHasher->hashPassword($admin, $_ENV['ADMIN_PASSWORD']);
        $admin->setPassword($password);

        $manager->persist($admin);

        $manager->flush();
    }
}

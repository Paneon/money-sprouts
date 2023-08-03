<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Factory\TransactionFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function __construct()
    {
    }

    public function load(ObjectManager $manager): void
    {

        UserFactory::createMany(2);

        TransactionFactory::createMany(
            10,
            function () {
                return [
                    'user' => UserFactory::random(),
                ];
            },
        );

        // Create admin afterwards, so it doesn't get transactions
        $admin = UserFactory::new()->admin($_ENV['ADMIN_PASSWORD'])->create()
            ->setEmail($_ENV['ADMIN_MAIL'])
            ->setName('Admin');

        $manager->persist($admin);
        $manager->flush();
    }
}

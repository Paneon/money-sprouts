<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use App\Story\UserWithOutstandingPocketMoneyStory;

class OverviewControllerTest extends ApiTestCase
{
    private $entityManager;

    protected function setUp(): void
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    public function setUpUser()
    {
        // Create a mock user
        $user = new User();
        $user->setNextPayday(new \DateTime('-1 day'))
            ->setAllowance(1000)
            ->setBalance(0)
            ->setEmail('test@test.de')
            ->setName('Test')
            ->setPassword('asd')
            ->setTracked(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function testGetOverviewUpdatesNextPayDay(): void
    {
        UserWithOutstandingPocketMoneyStory::load();
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findTrackedUsers();

        $this->assertEquals(1, count($users));

        $user = $users[0];
        $userId = $user->getId();

        // Use Symfony's test client to make a request to your endpoint
        $client = static::createClient();
        $client->request('GET', '/api/overview/'.$userId.'.json'); // Adjust this URL to your routing setup

        // Fetch updated user from the database
        $this->entityManager->clear(User::class);
        $updatedUser = $this->entityManager->getRepository(User::class)->find($userId);

        // Assertions
        $this->assertNotEquals(
            expected: $user->getNextPayday(),
            actual: $updatedUser->getNextPayday(),
            message: "The nextPayday should have been updated."
        );
        $this->assertEquals(
            expected: 6,
            actual: $user->getNextPayday()->diff($updatedUser->getNextPayday())->days,
            message: "The nextPayday should be 6 days later."
        );
    }
}

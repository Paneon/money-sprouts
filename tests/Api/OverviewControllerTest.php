<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Account;
use App\Entity\Transaction;
use App\Entity\User;
use App\Factory\AccountFactory;
use App\Factory\UserFactory;
use App\Repository\AccountRepository;
use App\Repository\TransactionRepository;
use App\Story\UserWithOutstandingPocketMoneyStory;
use DateTime;

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

    public function setUpUser(): void
    {
        // Create a mock user
        $user = new User();
        $user
            ->setEmail('test@test.de')
            ->setName('Test')
            ->setPassword('asd');

        $account = new Account();
        $account->setNextPayday(new \DateTime('-1 day'))
            ->setAllowance(1000)
            ->setBalance(0);

        $this->entityManager->persist($user, $account);
        $this->entityManager->flush();
    }

    private function getAccountRepository(): AccountRepository
    {
        return $this->entityManager->getRepository(Account::class);
    }

    private function getTransactionRepository(): TransactionRepository
    {
        return $this->entityManager->getRepository(Transaction::class);
    }

    public function testGetOverviewUpdatesNextPayDay(): void
    {
        $this->markTestIncomplete();
        UserWithOutstandingPocketMoneyStory::load();
        $accountRepository = $this->getAccountRepository();

        $account = AccountFactory::random();

        // Use Symfony's test client to make a request to your endpoint
        $client = static::createClient();
        $client->request('GET', '/api/overview/' . $account->getId() . '.json');

        // Fetch updated user from the database
        $this->entityManager->clear(Account::class);

        $updatedAccount = $accountRepository->find($account->getId());

        // Assertions
        $this->assertNotEquals(
            expected: $account->getNextPayday()->format("d"),
            actual: $updatedAccount->getNextPayday()->format("d"),
            message: "The nextPayday should have been updated."
        );
        $this->assertEquals(
            expected: 6,
            actual: $account->getNextPayday()->diff($updatedAccount->getNextPayday())->days,
            message: "The nextPayday should be 6 days later."
        );
        $this->assertEquals(1000, $updatedAccount->getBalance());
    }

    public function testGetOverviewUpdatesMultiplePayDays(): void
    {
        $this->markTestIncomplete();
        
        $allowance = 1000;
        UserFactory::createOne();

        AccountFactory::new()->withAllowance($allowance)->nextPaydayTwoWeeksAgo();

        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findTrackedUsers();
        $this->assertEquals(1, count($users));

        $user = $users[0];
        $userId = $user->getId();

        // Use Symfony's test client to make a request to your endpoint
        $client = static::createClient();
        $client->request('GET', '/api/overview/' . $userId . '.json');

        // Fetch updated user from the database
        $this->entityManager->clear(User::class);

        $updatedUser = $userRepository->find($userId);

        // Assertions
        $this->assertNotEquals(
            expected: $user->getNextPayday()->format("d"),
            actual: $updatedUser->getNextPayday()->format("d"),
            message: "The nextPayday should have been updated."
        );
        $this->assertEquals(2000, $updatedUser->getBalance());

        $transactions = $this->getTransactionRepository()->findAll();
        $this->assertCount(2, $transactions);

        $firstPayday = (new DateTime('-12 days'))->format("d");
        $this->assertEquals($firstPayday, $transactions[0]->getEffectiveOn()->format("d"));
        $secondPayday = (new DateTime('-5 days'))->format("d");
        $this->assertEquals($secondPayday, $transactions[1]->getEffectiveOn()->format("d"));
    }
}

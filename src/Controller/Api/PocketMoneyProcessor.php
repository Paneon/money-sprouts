<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Account;
use App\Factory\EarningFactory;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class PocketMoneyProcessor extends AbstractController
{
    public function __construct(
        private readonly LoggerInterface $logger,
    ) {
    }

    public function __invoke(?Account $account, EntityManagerInterface $entityManager): Account
    {
        $this->logger->debug(PocketMoneyProcessor::class.'::__invoke', [$account]);
        if (!$account) {
            $this->json(null, Response::HTTP_NOT_FOUND);
        }

        if (null === $account->getNextPayday()) {
            $this->logger->warning('Please ask Guardian to enter a first payday to this account.');

            return $account;
        }

        $now = new \DateTime();

        while ($now >= $account->getNextPayday()) {
            // Update balance and nextPayday
            $next = clone $account->getNextPayday();
            $next->modify('+1 week');

            $effectiveOn = clone $account->getNextPayday();

            $account->setNextPayday($next);
            $this->logger->debug('Set Next Payday to {next}', ['next' => $next]);

            $pocketMoney = EarningFactory::createPocketMoney($account, $effectiveOn);
            $entityManager->persist($pocketMoney);
            $entityManager->persist($account);
            $entityManager->flush();
        }

        return $account;
    }
}

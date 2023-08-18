<?php

declare(strict_types=1);

namespace App\Controller;

use App\Factory\EarningFactory;
use App\Repository\AccountRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OverviewController extends AbstractController
{
    public function __construct(
        private readonly LoggerInterface   $logger,
        private readonly AccountRepository $accountRepository,
    )
    {
    }

    #[Route(path: "/api/overview/{accountId}.{_format}")]
    public function getOverview(int $accountId, EntityManagerInterface $entityManager): Response
    {
        $account = $this->accountRepository->find($accountId);

        if (!$account) {
            $this->json(null, Response::HTTP_NOT_FOUND);
        }

        $now = new DateTime();

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

        return $this->json($account, Response::HTTP_OK);
    }
}

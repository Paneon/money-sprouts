<?php

declare(strict_types=1);

namespace App\Controller;

use App\Factory\EarningFactory;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OverviewController extends AbstractController
{
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly UserRepository  $userRepository,
    )
    {
    }

    #[Route(path: "/api/overview/{userId}.{_format}")]
    public function getOverview(int $userId, EntityManagerInterface $entityManager): Response
    {
        $user = $this->userRepository->find($userId);

        if (!$user) {
            $this->json(null, Response::HTTP_NOT_FOUND);
        }

        if (!$user->isTracked()) {
            return $this->json(null, Response::HTTP_BAD_REQUEST);
        }

        $now = new DateTime();

        if ($now >= $user->getNextPayday()) {
            // Update balance and nextPayday
            $next = clone $user->getNextPayday();
            $next->modify('+1 week');
            $user->setNextPayday($next);
            $this->logger->debug('Set Next Payday to {next}', ['next' => $next]);

            $pocketMoney = EarningFactory::createPocketMoney($user);

            $entityManager->persist($pocketMoney);
            $entityManager->persist($user);
            $entityManager->flush();
        }

        return $this->json($user, Response::HTTP_OK);
    }
}

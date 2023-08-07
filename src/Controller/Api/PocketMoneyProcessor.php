<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Factory\EarningFactory;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
class PocketMoneyProcessor extends AbstractController
{
    public function __construct(
        private readonly LoggerInterface $logger,
    )
    {
    }

    public function __invoke(?User $user, EntityManagerInterface $entityManager): User
    {
        $this->logger->debug('OverviewController::__invoke', [$user]);
        if (!$user) {
            $this->json(null, Response::HTTP_NOT_FOUND);
        }

        if (!$user->isTracked()) {
            throw new BadRequestHttpException("This endpoint works only for tracked Users.");
        }

        $now = new DateTime();

        while ($now >= $user->getNextPayday()) {
            // Update balance and nextPayday
            $next = clone $user->getNextPayday();
            $next->modify('+1 week');

            $effectiveOn = clone $user->getNextPayday();

            $user->setNextPayday($next);
            $this->logger->debug('Set Next Payday to {next}', ['next' => $next]);

            $pocketMoney = EarningFactory::createPocketMoney($user, $effectiveOn);
            $entityManager->persist($pocketMoney);
            $entityManager->persist($user);
            $entityManager->flush();
        }

        return $user;
    }
}

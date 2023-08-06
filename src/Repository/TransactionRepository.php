<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Transaction;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Transaction>
 *
 * @method Transaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaction[]    findAll()
 * @method Transaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Transaction::class);
    }

    /**
     * @return Transaction[] Returns an array of Transaction objects
     */
    public function findNotApplied(): array
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.applied = 0')
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function findLastPocketMoneyByUser(?User $user): ?Transaction
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.pocketMoney = 1')
            ->orderBy('t.id', 'DESC')
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }
}

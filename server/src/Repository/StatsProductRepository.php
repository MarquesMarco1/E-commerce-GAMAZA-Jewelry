<?php

namespace App\Repository;

use App\Entity\StatsProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StatsProduct>
 */
class StatsProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StatsProduct::class);
    }

    public function getTrending() {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT product_id, count FROM stats_product ORDER BY count DESC LIMIT 6';

        $resultSet = $conn->executeQuery($sql);

        return $resultSet->fetchAllAssociative();
    }

//    /**
//     * @return StatsProduct[] Returns an array of StatsProduct objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?StatsProduct
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

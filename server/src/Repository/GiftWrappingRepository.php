<?php

namespace App\Repository;

use App\Entity\GiftWrapping;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GiftWrapping>
 */
class GiftWrappingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GiftWrapping::class);
    }

//    /**
//     * @return GiftWrapping[] Returns an array of GiftWrapping objects
//     */
   public function findGift($date): array
   {
        $conn = $this->getEntityManager()->getConnection();

        $sql = "SELECT * FROM gift_wrapping WHERE :val BETWEEN DATE_FORMAT(start, '%m-%d') AND DATE_FORMAT(end, '%m-%d')";

        $resultSet = $conn->executeQuery($sql, ['val'=>$date]);

        return $resultSet->fetchAllAssociative();

   }

// select * from gift_wrapping where '12-05' BETWEEN date_format(start, '%m-%d') and date_format(end, '%m-%d');
//    public function findOneBySomeField($value): ?GiftWrapping
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

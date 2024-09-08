<?php

namespace App\Repository;

use App\Entity\PromotionalCode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PromotionalCode>
 */
class PromotionalCodeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PromotionalCode::class);
    }

//    /**
//     * @return PromotionalCode[] Returns an array of PromotionalCode objects
//     */
        public function findByTrimmedCode($code)
        {
            $query = $this->createQueryBuilder('p')
                ->where('TRIM(p.code) = :code')
                ->setParameter('code', trim($code))
                ->getQuery();
            
            return $query->getResult();
        }
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PromotionalCode
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

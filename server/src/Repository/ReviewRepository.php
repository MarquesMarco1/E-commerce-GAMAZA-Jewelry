<?php

namespace App\Repository;

use App\Entity\Review;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Review>
 */
class ReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Review::class);
    }

//    /**
//     * @return Review[] Returns an array of Review objects
//     */
    public function orderByAsc ($id){
       return $this->createQueryBuilder('r')
            ->andWhere('r.product = :val')
            ->setParameter('val', $id)
            ->orderBy('r.id', 'ASC')
            ->getQuery()
            ->getResult()
       ;
    }

    public function orderByDesc ($id){
       return $this->createQueryBuilder('r')
            ->andWhere('r.product = :val')
            ->setParameter('val', $id) 
            ->orderBy('r.id', 'DESC')
            ->getQuery()
            ->getResult()
       ;
    }

    public function searchBy ($stars){
       return $this->createQueryBuilder('r')
           ->andWhere('r.stars = :val')
           ->setParameter('val', $stars)
           ->orderBy('r.id', 'ASC')
           ->getQuery()
           ->getResult()
       ;
    }
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Review
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

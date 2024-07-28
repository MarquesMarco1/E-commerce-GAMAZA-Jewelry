<?php

namespace App\Repository;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

//    /**
//     * @return Category[] Returns an array of Category objects 
//     */
   public function findAllInFR(): array
   {
       return $this->createQueryBuilder('c')
            ->select('c.id, c.name, c.image, c.lastUpdated, c.description')
           ->orderBy('c.id', 'ASC')
           ->getQuery()
           ->getResult()
       ;
   }

   public function findAllInEN(): array
   {
       return $this->createQueryBuilder('c')
            ->select('c.id, c.nameEn, c.image, c.lastUpdated, c.descriptionEn')
            ->orderBy('c.id', 'ASC')
            ->getQuery()
            ->getResult()
       ;
   }

//    public function findOneBySomeField($value): ?Category
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

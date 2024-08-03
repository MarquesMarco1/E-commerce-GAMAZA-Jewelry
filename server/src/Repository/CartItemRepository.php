<?php

namespace App\Repository;

use App\Entity\CartItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CartItem>
 */
class CartItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CartItem::class);
    }

//    /**
//     * @return CartItem[] Returns an array of CartItem objects
//     */
    public function findOneByCartAndProduct($cartId, $productId){
        return $this->createQueryBuilder('c')
                    ->andWhere('c.cart = :cartId')
                    ->setParameter('cartId', $cartId)
                    ->andWhere('c.product = :productId')
                    ->setParameter('productId', $productId)
                    ->getQuery()
                    ->getResult()
                ;
        // return ["cart"=>$cartId, "product"=>$productId];
    }
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CartItem
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

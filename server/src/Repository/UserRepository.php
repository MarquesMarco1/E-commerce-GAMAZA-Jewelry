<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function getRoles($email = null) {

        if($email !== null) {
            $conn = $this->getEntityManager()->getConnection();

            $sql = 'SELECT roles FROM user WHERE email = :email';
    
            $resultSet = $conn->executeQuery($sql, ['email' => $email]);
    
            return $resultSet->fetchAllAssociative();
        }
    }
    
    public function getFullAdress($email = null) {

        if($email !== null) {
            $conn = $this->getEntityManager()->getConnection();

            $sql = 'SELECT firstname, adress, city, region, zip_code, country, email, phone_number FROM user WHERE email = :email';
    
            $resultSet = $conn->executeQuery($sql, ['email' => $email]);
    
            return $resultSet->fetchAllAssociative();
        }
    }
    public function getTrending($product_id) {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM product WHERE id = :product_id';

        $resultSet = $conn->executeQuery($sql, ['product_id' => $product_id]);

        return $resultSet->fetchAllAssociative();
    }
    
//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

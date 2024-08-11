<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use DateTime;


class UserController extends AbstractController
{
    #[Route("/api/users", name: "users")]
    public function getAllUsers(UserRepository $repository)
    {
        $users = $repository->findAll();
        return $this->json(['allUsers' => $users], 200);

    }
    #[Route("/api/user", name: "user")]
    public function user(Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data["email"];
        $user = $entityManager->getRepository(User::class)->findBy(['email' => $email]);
        return $this->json(['user' => $user], 200);
    }
    #[Route("/api/user/{id}")]
    public function getInfo(User $user, EntityManagerInterface $entityManager, int $id)
    {
        return $this->json(['user' => $user], 200);
    }

    #[Route("/api/editUser/{id}")]
    public function editUser(User $user, EntityManagerInterface $entityManager, int $id, Request $request, UserPasswordHasherInterface $userPasswordHasher)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        if ($formData) {

            if ($formData["email"] !== null)
                $user->setEmail($formData["email"]);

            if ($formData["password"] !== null) {
                $user->setPassword(
                    $userPasswordHasher->hashPassword(
                        $user,
                        $formData["password"]
                    )
                );
            } else {
                $user->setPassword($user->getPassword());
            }

            if ($formData["lastname"] !== null)
                $user->setLastname($formData["lastname"]);

            if ($formData["firstname"] !== null)
                $user->setFirstname($formData["firstname"]);

            if ($formData["adress"] !== null)
                $user->setAdress($formData["adress"]);

            if ($formData["zipCode"] !== null)
                $user->setZIPCode($formData["zipCode"]);

            if ($formData["city"] !== null)
                $user->setCity($formData["city"]);

            if ($formData["country"] !== null)
                $user->setCountry($formData["country"]);

            if ($formData["phone"] !== null)
                $user->setPhoneNumber($formData["phone"]);

            if($formData["region"] !== null)
                $user->setRegion($formData["region"]);

            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $user->setLastUpdated($now);

            $entityManager->persist($user);
            $entityManager->flush();
            
            return $this->json(['success' => true], 200);

        }
    }
    #[Route("/api/deleteUser/{id}")]
    public function deleteUser(User $user, EntityManagerInterface $entityManager, int $id)
    {
        $cart = $entityManager->getRepository(Cart::class)->findOneBy(["user"=>$user->getId()]);
        if($cart){
            $entityManager->remove($cart);
            $entityManager->flush();
        }
        $entityManager->remove($user);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }
}

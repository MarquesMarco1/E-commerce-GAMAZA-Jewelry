<?php

namespace App\Controller;

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
    #[Route("/api/users",name : "users")]
    public function getAllUsers(UserRepository $repository)
    {
        $users = $repository->findAll();
        return $this->json(['allUsers' => $users], 200);

    }
    #[Route("/api/user",name : "user")]
    public function user(Request $request, EntityManagerInterface $entityManager){
        $data = json_decode($request->getContent(), true);
        $email = $data["email"];
        $user = $entityManager->getRepository(User::class)->findBy(['email' => $email]);
        return $this->json(['user' => $user], 200);
    }
    #[Route("/api/user/{id}")]
    public function getInfo(User $user,EntityManagerInterface $entityManager, int $id){
        return $this->json(['user' => $user], 200);
    }

    #[Route("/api/editUser/{id}")]
    public function editUser(User $user,EntityManagerInterface $entityManager, int $id, Request $request, UserPasswordHasherInterface $userPasswordHasher){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
       if($formData){
            $user->setEmail($formData["email"]);
            if($formData["password"] !== null){
                $user->setPassword(
                    $userPasswordHasher->hashPassword(
                    $user,$formData["password"])
                );
            }else{
                $user->setPassword($user->getPassword());
            }
            $user->setLastname($formData["lastname"]);
            $user->setFirstname($formData["firstname"]);
            $user->setAdress($formData["adress"]);
            $user->setZIPCode($formData["zipCode"]);
            $user->setCity($formData["city"]);
            $user->setCountry($formData["country"]);
            $user->setPhoneNumber($formData["phone"]);
            $now = new DateTime();
            $now->format("Y-m-d H   :i:s");
            $user->setLastUpdated($now);
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        
       }
    }
    #[Route("/api/deleteUser/{id}")]
    public function deleteUser(User $user,EntityManagerInterface $entityManager, int $id){
        $entityManager->remove($user);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }
}

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
}

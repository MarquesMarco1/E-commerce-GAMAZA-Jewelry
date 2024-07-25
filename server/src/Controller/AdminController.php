<?php

namespace App\Controller;

use App\Entity\User as EntityUser;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Middleware\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class AdminController extends AbstractController
{
    #[Route("/api/isAdmin/{id}", name:"isAdmin")]
    public function isAdmin(UserRepository $userRepository, $id){
        $user = new User($id);
        $role = $user->isAdmin($userRepository);
        return $this->json(['isAdmin' => $role], 200);
    }
    #[Route("/api/createUser")]
    public function createUser( Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $user = new EntityUser;
        if($formData){
            $user->setEmail($formData["email"]);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                $user,$formData["password"])
            );
                        
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }
}

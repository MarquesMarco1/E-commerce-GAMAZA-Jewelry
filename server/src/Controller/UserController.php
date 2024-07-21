<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route("/api/users",name : "users")]
    public function getAllProducts(UserRepository $repository)
    {
        $users = $repository->findAll();
        return $this->json(['allUsers' => $users], 200);

    }
}

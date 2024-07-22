<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Middleware\Admin;


class AdminController extends AbstractController
{
    #[Route("/api/isAdmin/{id}", name:"isAdmin")]
    public function isAdmin(UserRepository $userRepository, $id){
        $user = new Admin($id);
        $role = $user->isAdmin($userRepository);
        return $this->json(['isAdmin' => $role], 200);
    }
}

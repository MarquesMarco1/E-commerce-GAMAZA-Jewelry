<?php

namespace App\Controller;

use App\Entity\SizeBracelets;
use App\Repository\SizeBraceletsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SizeBraceletsController extends AbstractController
{
    #[Route('/api/sizeBracelets', name: 'app_size_bracelets', methods:["GET"])]
    public function sizeBracelets(SizeBraceletsRepository $repository)
    {
        $sizeBracelets = $repository->findAll();
        return $this->json(['sizeBracelets' => $sizeBracelets], 200);
    }
}

<?php

namespace App\Controller;

use App\Repository\SizeRingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SizeRingsController extends AbstractController
{
    #[Route('/api/sizeRings', name: 'app_size_rings', methods:["GET"])]
    public function index(SizeRingsRepository $repository)
    {
        $sizeRings = $repository->findAll();
        return $this->json(['sizeRings' => $sizeRings], 200);
    }
}

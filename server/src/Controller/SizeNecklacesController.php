<?php

namespace App\Controller;

use App\Entity\SizeNecklaces;
use App\Repository\SizeNecklacesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SizeNecklacesController extends AbstractController
{
    #[Route('/api/sizeNecklaces', name: 'app_size_necklaces', methods:["GET"])]
    public function index(SizeNecklacesRepository $repository)
    {
        $sizeNecklaces = $repository->findAll();
        return $this->json(['sizeNecklaces' => $sizeNecklaces], 200);
    }
}

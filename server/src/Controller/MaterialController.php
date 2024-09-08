<?php

namespace App\Controller;

use App\Repository\MaterialRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MaterialController extends AbstractController
{
    #[Route('/api/material', name: 'app_material')]
    public function getMaterial(MaterialRepository $repository){
        $materials = $repository->findAll();
        return $this->json(['allMaterial' => $materials], 200);
    }
}

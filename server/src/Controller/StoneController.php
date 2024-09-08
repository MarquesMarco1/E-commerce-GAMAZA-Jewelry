<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Repository\StoneRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class StoneController extends AbstractController
{
    #[Route('/api/stone', name: 'app_stone')]
    public function getMaterial(StoneRepository $repository){
        $stones = $repository->findAll();
        return $this->json(['allStone' => $stones], 200);
    }
}

<?php

namespace App\Controller;

use App\Repository\SizeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SizeController extends AbstractController
{
    #[Route('/api/size')]
    public function size(SizeRepository $repository)
    {
        $sizes = $repository->findAll();
        return $this->json(['allSize' => $sizes], 200);
    }
}

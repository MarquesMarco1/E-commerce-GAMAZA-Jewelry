<?php

namespace App\Controller;

use App\Entity\ShippingThreshold;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ShippingThresholdController extends AbstractController
{
    #[Route('/api/shippingThreshold', name: 'app_shipping_threshold', methods:["GET"])]
    public function index(EntityManagerInterface $entityManager)
    {
        $treshold =$entityManager->getRepository(ShippingThreshold::class)->findAll();
        return $this->json(["treshold"=>$treshold], 200);
    }
}

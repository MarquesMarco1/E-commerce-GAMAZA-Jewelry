<?php

namespace App\Controller;

use App\Entity\ShippingInsurance;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ShippingInsuranceController extends AbstractController
{
    #[Route('/api/shippingInsurance', name: 'app_shipping_insurance', methods:["GET"])]
    public function index(EntityManagerInterface $entityManager)
    {
        $insurances = $entityManager->getRepository(ShippingInsurance::class)->findAll();
        return $this->json(["insurances"=>$insurances], 200);
    }
}

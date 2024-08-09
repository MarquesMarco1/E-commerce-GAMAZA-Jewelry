<?php

namespace App\Controller;

use App\Entity\ShippingCountry;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ShippingCountryController extends AbstractController
{
    #[Route('/api/shippingCountry', name: 'app_shipping_country', methods:["GET"])]
    public function index(EntityManagerInterface $entityManager)
    {
        $country = $entityManager->getRepository(ShippingCountry::class)->findAll();
        $blacklist = [];
        $whitelist = [];
        foreach($country as $elem){
            if($elem->isBlacklist() === true){
                array_push($blacklist, $elem);
            }else{
                array_push($whitelist, $elem);
            }
        }
        return $this->json(["whitelist"=>$whitelist, "blacklist"=>$blacklist], 200);
    }
}

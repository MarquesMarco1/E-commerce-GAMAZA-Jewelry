<?php

namespace App\Controller;

use App\Entity\ShippingCountry;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
                array_push($whitelist, $elem);
            }else{
                array_push($blacklist, $elem);
            }
        }
        return $this->json(["blacklist"=>$blacklist, "whitelist"=>$whitelist], 200);
    }

    #[Route('/api/switchCountry', name: 'app_switch_country', methods:["POST"])]
    public function switchCountry(Request $request, EntityManagerInterface $entityManager){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $country = $entityManager->getRepository(ShippingCountry::class)->findOneBy(['id'=>$formData["countryId"]]);

        if($formData["list"] === "whiteList"){
            $country->setBlacklist(false);
            $entityManager->persist($country);
            $entityManager->flush();

            $country = $entityManager->getRepository(ShippingCountry::class)->findAll();
            $blacklist = [];
            $whitelist = [];
            foreach($country as $elem){
                if($elem->isBlacklist() === true){
                    array_push($whitelist, $elem);
                }else{
                    array_push($blacklist, $elem);
                }
            }
            return $this->json(["blacklist"=>$blacklist, "whitelist"=>$whitelist], 200);
            
        }else{
            $country->setBlacklist(true);
            $entityManager->persist($country);
            $entityManager->flush();
            
            $country = $entityManager->getRepository(ShippingCountry::class)->findAll();
            $blacklist = [];
            $whitelist = [];
            foreach($country as $elem){
                if($elem->isBlacklist() === true){
                    array_push($whitelist, $elem);
                }else{
                    array_push($blacklist, $elem);
                }
            }
            return $this->json(["blacklist"=>$blacklist, "whitelist"=>$whitelist], 200);

        }
    }

}

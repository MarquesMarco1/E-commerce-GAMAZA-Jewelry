<?php

namespace App\Controller;

use App\Entity\GiftWrapping;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class GiftWrappingController extends AbstractController
{  
    #[Route('/api/giftWrapping/{date}', name: 'app_gift_wrapping', methods:["GET"])]
    public function index(EntityManagerInterface $entityManager, string $date)
    {
        $explode_date = explode("-",$date);
        array_shift($explode_date);
        $date_final = implode("-",$explode_date);
       $giftWrapping = $entityManager->getRepository(GiftWrapping::class)->findGift('12-23');
        return $this->json(["giftWrapping"=>$giftWrapping], 200);
    }
}

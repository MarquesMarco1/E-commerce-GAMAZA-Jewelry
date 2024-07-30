<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Promotion;
use App\Repository\PomotionRepository;
use App\Repository\PromotionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;
use Doctrine\ORM\EntityManager;

class PromotionController extends AbstractController
{
    #[Route('/api/addPromotion')]
    function addPromotion (Request $request, EntityManagerInterface $entityManager){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $promotion = new Promotion;
        $product = $entityManager->getRepository(Product::class)->find($formData["product"]);
        if($formData){
            $promotion->setProduct($product);
            $promotion->setPourcentage(intval($formData["pourcentage"]));
            $now = new DateTime();
            $now->format("Y-m-d H   :i:s");
            $promotion->setLastUpdated($now);
            $entityManager->persist($promotion);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route('/api/getPromotion')]
    function promotion(PromotionRepository $repository){
        $products = $repository->findAll();
        return $this->json(['products'=>$products], 200);
    }

    #[Route('/api/getPromotion/{id}')]
    function promotionId(EntityManagerInterface $entityManager, int $id){
        $product = $entityManager->getRepository(Promotion::class)->findBy(["product"=>$id]);
        return $this->json(['product'=>$product], 200);
    }

    // #[Route("/api/products/{id}",name : "products")]
    // public function getProducts(EntityManagerInterface $entityManager, int $id)
    // {
    //     $products = $entityManager->getRepository(Product::class)->findBy(['id' => $id]);
    //     return $this->json(['products' => $products], 200);

    // }

}

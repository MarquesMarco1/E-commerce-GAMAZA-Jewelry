<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Promotion;
use App\Repository\PomotionRepository;
use App\Repository\ProductRepository;
use App\Repository\PromotionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;

class PromotionController extends AbstractController
{
    #[Route('/api/promotion', methods: ['GET'])]
    public function promotion(PromotionRepository $repository){
        $promotion = $repository->findAll();
        return $this->json(["promotion"=>$promotion], 200);
    }

    #[Route('/api/promotion', methods: ['POST'])]
    public function addPromotion(Request $request, EntityManagerInterface $entityManager){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $product = $entityManager->getRepository(Product::class)->find($formData["product"]);
        $promotion = $entityManager->getRepository(Promotion::class)->find($formData["pourcentage"]);
        if($product && $promotion){
            $product->setPromotion($promotion);
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(["sucess"=>true], 200);
        }
    }

    #[Route('/api/allProductsInPromo', methods:['GET'])]
    public function allProductsInPromo(ProductRepository $productRepository){
        $products = $productRepository->findAllWithPromotion();
        return $this->json(["products"=>$products]);
    }

    // #[Route('/api/getPromotion/{id}')]
    // function promotionId(EntityManagerInterface $entityManager, int $id){
    //     $product = $entityManager->getRepository(Promotion::class)->findBy(["product"=>$id]);
    //     return $this->json(['product'=>$product], 200);
    // }

}

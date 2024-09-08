<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;

class SearchController extends AbstractController
{
    #[Route('/api/search/{id}', name: 'app_search')]
    public function searchAllProducts(EntityManagerInterface $entityManager, ProductRepository $productRepository, CategoryRepository $categoryRepository, string $id )
    {

        $product = $productRepository->findAll();
        // $category = $categoryRepository->findAll();
        if($id == "FR"){
            // $product =$entityManager->getRepository(Product::class)->findAllInFR();
            $category = $entityManager->getRepository(Category::class)->findAllInFR();
        }else if ($id == "EN"){
            // $product =$entityManager->getRepository(Product::class)->findAll();
            $category = $entityManager->getRepository(Category::class)->findAllInEN();
        }
        if (!$product || !$category) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        return $this->json(['product' => $product, 'category' => $category], 200);
    }

    #[Route('/api/filterModele/{firstWorld}/{lastWord}', methods:["GET"])]
    public function filterModele(string $firstWorld, string $lastWord, EntityManagerInterface $entityManager){
        $products = $entityManager->getRepository(Product::class)->findModele($firstWorld, $lastWord);
        if($products){
            return $this->json(["products"=>$products], 200);
        }
    }
}

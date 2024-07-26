<?php

namespace App\Controller;

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
    #[Route('/api/search', name: 'app_search')]
    public function searchAllProducts(ProductRepository $productRepository, CategoryRepository $categoryRepository )
    {

        $product = $productRepository->findAll();
        $category = $categoryRepository->findAll();

        if (!$product || !$category) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        return $this->json(['product' => $product, 'category' => $category], 200);
    }
}

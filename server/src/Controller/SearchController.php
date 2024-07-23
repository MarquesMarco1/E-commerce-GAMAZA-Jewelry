<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManager;

class SearchController extends AbstractController
{
    #[Route('api/search', name: 'app_search')]
    public function searchAllProducts(int $id, ProductRepository $productRepository): Response
    {
        $product = $productRepository->findAll()

        if (!$product) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        $data = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            // 'price' => $product->getPrice(),
            'category_id' => $product->getCategory() ? $product->getCategory()->getId() : null,
            // 'material_id' => $product->getMaterial() ? $product->getMaterial()->getId() : null,
            // 'stone_id' => $product->getStone() ? $product->getStone()->getId() : null,
            // 'color' => $product->getColor(),
            // 'size' => $product->getSize(),
            // 'weight' => $product->getWeight(),
            // 'stock_qty' => $product->getStockQty(),
        ];

        return $this->json([
            'products' => $data], 200);
    }
}

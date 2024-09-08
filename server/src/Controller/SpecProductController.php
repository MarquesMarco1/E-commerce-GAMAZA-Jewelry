<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class SpecProductController extends AbstractController
{
    #[Route("/api/products/{id}", name: "getProduct", methods: ["GET"])]
    public function getProduct(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        $data = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'image' => $product->getImage(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'category_id' => $product->getCategory() ? $product->getCategory()->getId() : null,
            'material_id' => $product->getMaterial() ? $product->getMaterial()->getId() : null,
            'stone_id' => $product->getStone() ? $product->getStone()->getId() : null,
            'color' => $product->getColor(),
            'size' => $product->getSize(),
            'weight' => $product->getWeight(),
            'stock_qty' => $product->getStockQty(),
        ];

        return $this->json(['product' => $data], 200);
    }
}

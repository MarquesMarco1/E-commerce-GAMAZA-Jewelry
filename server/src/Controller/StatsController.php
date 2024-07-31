<?php

namespace App\Controller;

use App\Entity\StatsProduct;
use App\Repository\StatsProductRepository;
use App\Repository\UserRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use DateTime;

class StatsController extends AbstractController
{
    // SETTERS
    #[Route("/api/stats/products/{id}")]
    public function newEntry(int $id, StatsProductRepository $statsProductRepository, ProductRepository $productRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $product = $productRepository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], 404);

        }

        $statsProduct = $statsProductRepository->findOneBy(['product' => $product]);

        if ($statsProduct) {
            $statsProduct->setCount($statsProduct->getCount() + 1);
        } else {
            $statsProduct = new StatsProduct();
            $statsProduct->setProduct($product);
            $statsProduct->setCount(1);
            $statsProduct->setLastUpdated(new DateTime());
        }

        $entityManager->persist($statsProduct);
        $entityManager->flush();

        return $this->json(['New Entry Added for' => $statsProduct], 200);
    }

    // GETTERS
    #[Route("/api/getStats/trending")]

    public function getStatsTrending(StatsProductRepository $statsProductRepository, UserRepository $userRepository): JsonResponse
    {
        $trendingProducts = [];

        $idProducts = $statsProductRepository->getTrending();

        foreach ($idProducts as $value) {
            $tmp = $userRepository->getTrending($value['product_id']);
            array_push($trendingProducts, $tmp);
        }


        return $this->json([$trendingProducts], 200);
    }
}

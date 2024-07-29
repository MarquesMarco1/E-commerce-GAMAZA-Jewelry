<?php

namespace App\Controller;

use App\Repository\CartRepository;
use App\Repository\CartItemRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class CartController extends AbstractController
{
    #[Route('/api/cart/{id}', name: 'app_cart', methods: ['GET'])]
    public function index(CartItemRepository $cartItemRepository, $id)
    {
        $result = $cartItemRepository->findAll();
        return $this->json(['Cart Items' => $result], 200);
    }
}

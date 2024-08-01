<?php

namespace App\Controller;
use App\Entity\CartItem;
use App\Repository\CartItemRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;


class CartController extends AbstractController
{
    #[Route('/api/cart/{id}', name: 'app_cart', methods: ['GET'])]
    public function index(CartItemRepository $cartItemRepository, int $id)
    {
        $result = $cartItemRepository->findBy(['cart' => $id]);
        return $this->json($result, 200);
    }

    #[Route('/api/cart/{id}', name: 'app_cart_delete', methods: ['DELETE'])]
    public function delete(CartItem $cartItem, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($cartItem);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }
}

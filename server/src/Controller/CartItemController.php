<?php

namespace App\Controller;

use App\Entity\CartItem;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CartItemController extends AbstractController
{
    #[Route('/api/cartItem/{id}', name: 'app_cart_item', methods: ['DELETE'])]
    public function delete(CartItem $cartItem, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($cartItem);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }
}

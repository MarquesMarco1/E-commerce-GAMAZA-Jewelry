<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\CartItem;
use App\Entity\Product;
use App\Repository\CartItemRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Datetime;

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

    #[Route('/api/cartItem', name: 'app_cartItem', methods: ['POST'])]
    public function addCart(Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $user = $entityManager->getRepository(User::class)->findOneBy(["email"=>$formData["user"]]);
        $cartId = $entityManager->getRepository(Cart::class)->findOneBy(["user"=>$user->getId()]);
        $productId = $entityManager->getRepository(Product::class)->findOneBy(["id"=>$formData["product"]]);
        if($cartId !== null){
            $cartItem = new CartItem;
            $cartItem->setCart($cartId);
            $cartItem->setProduct($productId);
            $cartItem->setItemQty($formData["quantity"]);
            $cartItem->setSize($formData["size"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $cartItem->setLastUpdated($now);
            $entityManager->persist($cartItem);
            $entityManager->flush();
            
            return $this->json(["success"=>$cartItem], 200);
        }else{
            $cart = new Cart;
            $cart->setUser($user);
            // $cart_id = $cart->getId();
            $entityManager->persist($cart);
            $entityManager->flush();

            $cartId = $entityManager->getRepository(Cart::class)->findOneBy(["user"=>$user->getId()]);

            $cartItem = new CartItem;
            $cartItem->setCart($cartId);
            $cartItem->setProduct($productId);
            $cartItem->setItemQty($formData["quantity"]);
            $cartItem->setSize($formData["size"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $cartItem->setLastUpdated($now);
            $entityManager->persist($cartItem);
            $entityManager->flush();
            return $this->json(["success"=>$cartItem], 200);
        }
    }
}

<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\User;
use App\Entity\WishList;
use App\Entity\WishlistItem;
use App\Repository\WishlistItemRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;

class WishlistController extends AbstractController
{
    #[Route('/api/wishlist', name: 'app_wishlist_add', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $entityManager)
    {        
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $user = $entityManager->getRepository(User::class)->findOneBy(["id"=>$formData["user"]]);
        $wishlistId = $entityManager->getRepository(WishList::class)->findOneBy(["user"=>$user]);
        $productId = $entityManager->getRepository(Product::class)->findOneBy(["id"=>$formData["product"]]);
        if($wishlistId !== null){
            $wishlistItem = new WishlistItem;
            $wishlistItem->setWishList($wishlistId);
            $wishlistItem->setProduct($productId);
            $wishlistItem->setSize($formData["size"]);
            $wishlistItem->setItemQty($formData["quantity"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $wishlistItem->setLastUpdated($now);
            $entityManager->persist($wishlistItem);
            $entityManager->flush();

            $cart = $entityManager->getRepository(Cart::class)->findOneBy(["user"=>$user]);
            if($cart !== null){
                $cart_item = $entityManager->getRepository(CartItem::class)->findOneByCartAndProduct($cart->getId(), $formData["product"]) ;
                $entityManager->remove($cart_item[0]);
                $entityManager->flush();
                return $this->json(["sucess"=>$cart_item], 200);
            }

        }else{
            $wishlist = new WishList;
            $wishlist->setUser($user);
            $entityManager->persist($wishlist);
            $entityManager->flush();
            // $wishlist_id = $wishlist->getId();

            $wishlist_id = $entityManager->getRepository(WishList::class)->findOneBy(["user"=>$user->getId()]);
            $wishlistItem = new WishlistItem;
            $wishlistItem->setWishList($wishlist_id);
            $wishlistItem->setProduct($productId);
            $wishlistItem->setSize($formData["size"]);
            $wishlistItem->setItemQty($formData["quantity"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $wishlistItem->setLastUpdated($now);
            $entityManager->persist($wishlistItem);
            $entityManager->flush();

            $cart = $entityManager->getRepository(Cart::class)->findOneBy(["user"=>$user]);
            if($cart !== null){
                $cart_item = $entityManager->getRepository(CartItem::class)->findOneByCartAndProduct($cart->getId(), $formData["product"]) ;
                $entityManager->remove($cart_item[0]);
                $entityManager->flush();
                return $this->json(["sucess"=>$cart_item], 200);
            }
        }
    }

    #[Route('/api/wishlist/{id}', name: 'app_wishlist', methods: ['GET'])]
    public function index(WishlistItemRepository $wishlistItemRepository, int $id)
    {
        $result = $wishlistItemRepository->findBy(['wishList' => $id]);
        return $this->json($result, 200);
    }

    #[Route('/api/wishlist/{id}', name: 'app_wishlist_delete', methods: ['DELETE'])]
    public function delete(WishlistItem $wishlistItem, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($wishlistItem);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }

    #[Route('/api/UserWishlist/{id}', name: 'app_user_wishlist', methods: ['GET'])]
    public function UserWishlist(EntityManagerInterface $entityManager, int $id)
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(["id"=>$id]);
        $wishlistId = $entityManager->getRepository(WishList::class)->findOneBy(["user"=>$user]);
        $items = $entityManager->getRepository(WishlistItem::class)->findBy(["wishList"=>$wishlistId]);
        return $this->json(["wishlist"=>$items], 200);
    }    
}

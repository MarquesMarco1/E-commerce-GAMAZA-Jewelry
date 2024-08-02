<?php

namespace App\Controller;

use App\Entity\WishlistItem;
use App\Repository\WishlistItemRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class WishlistController extends AbstractController
{
    #[Route('/api/wishlist/{id}', name: 'app_wishlist', methods: ['POST'])]
    public function add(Request $request, int $id)
    {
        $data = json_decode($request->getContent(), true);
        
        // $result = $wishlistItemRepository->findBy(['wishList' => $id]);
        // return $this->json($result, 200);
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
}

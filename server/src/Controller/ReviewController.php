<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Review;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;

class ReviewController extends AbstractController
{
    #[Route('/api/review', name: 'app_review', methods:["POST"])]
    public function review(Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $review = new Review;
        $productId = $entityManager->getRepository(Product::class)->find($formData["product"]);
        $user = $entityManager->getRepository(User::class)->findOneBy(["email"=>$formData["user"]]);
        if($formData){
            $review->setUser($user);
            $review->setStars($formData["selectedStar"]);
            $review->setDescription($formData["review"]);
            $review->setProduct($productId);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $review->setPublication($now);
            $entityManager->persist($review);
            $entityManager->flush();

            $reviews = $entityManager->getRepository(Review::class)->findBy(["product"=>$productId]);
            return $this->json(["reviews"=>$reviews], 200);
        }
    }

    #[Route('/api/review/{id}', methods:["GET"])]
    public function reviews(EntityManagerInterface $entityManager, int $id)
    {
        $reviews = $entityManager->getRepository(Review::class)->findBy(["product"=>$id]);
        return $this->json(["reviews"=>$reviews], 200);
    }

    #[Route('/api/reviewASCDESC/{sort}/{id}', methods:["GET"])]
    public function reviewsASC(EntityManagerInterface $entityManager, string $sort, int $id)
    {
        if($sort == "acs"){
            $reviews = $entityManager->getRepository(Review::class)->orderByAsc($id);
            return $this->json(["reviews"=>$reviews], 200);
        }else{
            $reviews = $entityManager->getRepository(Review::class)->orderByDesc($id);
            return $this->json(["reviews"=>$reviews], 200);
        }
        // $reviews = $entityManager->getRepository(Review::class)->orderByAsc();
        // return $this->json(["reviews"=>$reviews], 200);
    }

    // #[Route('/api/filterReview/desc', methods:["GET"])]
    // public function reviewsDESC(EntityManagerInterface $entityManager)
    // {
    //     $reviews = $entityManager->getRepository(Review::class)->orderByDesc();
    //     return $this->json(["reviews"=>$reviews], 200);
    // }

    #[Route('/api/filterReview/{note}', methods:["GET"])]
    public function reviewsNote(EntityManagerInterface $entityManager, int $note)
    {
        $reviews = $entityManager->getRepository(Review::class)->searchBy($note);
        return $this->json(["reviews"=>$reviews], 200);
    }
}

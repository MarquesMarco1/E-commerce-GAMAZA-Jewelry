<?php
namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use DateTime;

class CategoryController extends AbstractController
{
    #[Route('/api/admin/addCategorie', name: 'addCategorie', methods: ['POST'])]
    public function addCategorie(Request $request,  EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $category = new Category;
        if($formData){
            $category->setName($formData["nom"]);
            $category->setImage($formData["image"]);
            $category->setDescription($formData["description"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $category->setLastUpdated($now);
            $entityManager->persist($category);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route("/api/categorie", name:"category")]
    public function getCategory(CategoryRepository $repository){
        $categories = $repository->findAll();
        return $this->json(['allCategory' => $categories], 200);

    }
}

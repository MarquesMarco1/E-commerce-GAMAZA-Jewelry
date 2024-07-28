<?php
namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\UserRepository;
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
            $category->setNameEn($formData["nomEn"]);
            $category->setDescriptionEn($formData["descriptionEn"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $category->setLastUpdated($now);
            $entityManager->persist($category);
            $entityManager->flush();
            return $this->json(['success' => $formData], 200);
        }
    }

    #[Route("/api/categorie/{lang}", name:"category")]
    public function getCategory(EntityManagerInterface $entityManager, CategoryRepository $repository, string $lang){
        if($lang == "FR"){
            $categories = $entityManager->getRepository(Category::class)->findAllInFR();
            return $this->json(["allCategory"=>$categories], 200);
        }else if ($lang == "EN"){
            $categories = $entityManager->getRepository(Category::class)->findAllInEN();
            return $this->json(["allCategory"=>$categories], 200);
        }

    }

    #[Route("/api/TrueCategory/{id}",name : "TrueCategory")]
    public function getCategoryId(EntityManagerInterface $entityManager, int $id)
    {
        $products = $entityManager->getRepository(Category::class)->findBy(['id' => $id]);
        return $this->json(['category' => $products], 200);

    }

    #[Route('/api/editCategory/{id}', name: 'editCategorie')]
    public function editCategorie(Request $request, EntityManagerInterface $entityManager, Category $category, int $id)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        if($formData){
            $category->setName($formData["name"]);
            $category->setImage($formData["image"]);
            $category->setDescription($formData["description"]);
            $category->setNameEn($formData["nomEn"]);
            $category->setDescriptionEn($formData["descriptionEn"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $category->setLastUpdated($now);
            $entityManager->persist($category);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route("/api/delete/category/{id}",name : "deleteCategory")]
    public function deleteCategory(Category $category, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($category);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }
}

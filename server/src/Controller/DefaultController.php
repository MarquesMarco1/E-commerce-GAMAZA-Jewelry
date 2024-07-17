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

class DefaultController extends AbstractController
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

    #[Route('/api/admin/addArticle', name: 'addArticle')]
    public function addArticle(Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $product = new Product;
        $category = $entityManager->getRepository(Category::class)->find($formData["category_id"]);
        if($formData){
            $product->setName($formData["nom"]);
            $product->setImage($formData["image"]);
            $product->setDescription($formData["description"]);
            $product->setColor($formData["color"]);
            $product->setSize($formData["size"]);
            $product->setWeight(floatval($formData["weight"]));
            $product->setPrice(floatval($formData["price"]));
            $product->setCategory($category);
            $product->setStockQty(intval($formData["stockQty"]));
            $now = new DateTime();
            $now->format("Y-m-d H   :i:s");
            $product->setLastUpdated($now);
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route("/api/products",name : "products")]
    public function getProducts(ProductRepository $repository)
    {
        $products = $repository->findAll();
        return $this->json(['allArticle' => $products], 200);

    }

    #[Route("/api/delete/{id}",name : "deleteProduct")]
    public function deleteProduct(Product $product, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($product);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }

    #[Route("/api/users",name : "users")]
    public function getUsers()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Olususi Oluyemi',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 2,
                'name' => 'Camila Terry',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/42.jpg'
            ],
            [
                'id' => 3,
                'name' => 'Joel Williamson',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/67.jpg'
            ],
            [
                'id' => 4,
                'name' => 'Deann Payne',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 5,
                'name' => 'Donald Perkins',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/89.jpg'
            ]
        ];
    
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));
        
        return $response;
    }
}
<?php
namespace App\Controller;

use App\Entity\Category;
use App\Entity\Material;
use App\Entity\Product;
use App\Entity\Stone;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use DateTime;

class ProductController extends AbstractController
{
    #[Route('/api/admin/addArticle', name: 'addArticle')]
    public function addArticle(Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $product = new Product;
        $category = $entityManager->getRepository(Category::class)->find($formData["category_id"]);
        $material = $entityManager->getRepository(Material::class)->find($formData["material_id"]);
        $stone = $entityManager->getRepository(Stone::class)->find($formData["stone_id"]);
        if($formData){
            $product->setName($formData["nom"]);
            $product->setImage($formData["image"]);
            $product->setDescription($formData["description"]);
            $product->setColor($formData["color"]);
            $product->setSize($formData["size"]);
            $product->setWeight(floatval($formData["weight"]));
            $product->setPrice(floatval($formData["price"]));
            $product->setCategory($category);
            $product->setMaterial($material);
            $product->setStone($stone);
            $product->setStockQty(intval($formData["stockQty"]));
            $now = new DateTime();
            $now->format("Y-m-d H   :i:s");
            $product->setLastUpdated($now);
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route("/api/products",name : "productsAll")]
    public function getAllProducts(ProductRepository $repository)
    {
        $products = $repository->findAll();
        return $this->json(['allArticle' => $products], 200);

    }
    #[Route("/api/products/{id}",name : "products")]
    public function getProducts(EntityManagerInterface $entityManager, int $id)
    {
        $products = $entityManager->getRepository(Product::class)->findBy(['id' => $id]);
        return $this->json(['products' => $products], 200);

    }
    #[Route("/api/editProduct/{id}",name : "editProduct")]
    public function editProduct(Request $request, EntityManagerInterface $entityManager, Product $product, int $id)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $category = $entityManager->getRepository(Category::class)->find($formData["category_id"]);
        $material = $entityManager->getRepository(Material::class)->find($formData["material_id"]);
        $stone = $entityManager->getRepository(Stone::class)->find($formData["stone_id"]);
        if($formData){
            $product->setName($formData["nom"]);
            $product->setImage($formData["image"]);
            $product->setDescription($formData["description"]);
            $product->setColor($formData["color"]);
            $product->setSize($formData["size"]);
            $product->setWeight(floatval($formData["weight"]));
            $product->setPrice(floatval($formData["price"]));
            $product->setCategory($category);
            $product->setMaterial($material);
            $product->setStone($stone);
            $product->setStockQty(intval($formData["stockQty"]));
            $now = new DateTime();
            $now->format("Y-m-d H   :i:s");
            $product->setLastUpdated($now);
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route("/api/delete/{id}",name : "deleteProduct")]
    public function deleteProduct(Product $product, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($product);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }

    #[Route("/api/category/{id}",name : "categoryId")]
    public function getCategoryId(EntityManagerInterface $entityManager, int $id)
    {
        $products = $entityManager->getRepository(Product::class)->findBy(['category' => $id]);
        return $this->json(['products' => $products], 200);

    }
}

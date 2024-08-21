<?php
namespace App\Controller;

use App\Entity\AlertStock;
use App\Entity\Category;
use App\Entity\Material;
use App\Entity\Product;
use App\Entity\Stone;
use App\Entity\Promotion;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Middleware\User;
use App\Repository\UserRepository;
use DateTime;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

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
        if($formData["stone_id"] !== null){
            $stone = $entityManager->getRepository(Stone::class)->find($formData["stone_id"]);
        }
        $promotion = $entityManager->getRepository(Promotion::class)->find(1);
        if($formData){
            $product->setName($formData["nom"]);
            $product->setNameEn($formData["nomEn"]);
            $product->setImages($formData["image"]);
            $product->setDescription($formData["description"]);
            $product->setDescriptionEn($formData["descriptionEn"]);
            $product->setWeight(floatval($formData["weight"]));
            $product->setPrice(floatval($formData["price"]));
            $product->setPromotion($promotion);
            $product->setCategory($category);
            $product->setMaterial($material);
            if($formData["stone_id"]){
                $product->setStone($stone);
            }
            $product->setStockQty(intval($formData["stockQty"]));
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
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
    public function editProduct(Request $request, EntityManagerInterface $entityManager, Product $product, int $id, MailerInterface $mailer)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];

        $alerts = $entityManager->getRepository(AlertStock::class)->findBy(["product"=>$product]);
        if($alerts){
            foreach($alerts as $elem){
                $email = (new TemplatedEmail())
                    ->from(new Address('gamaza@gamaza.com'))
                    ->to($elem->getEmail())
                    ->subject($product->getName(). ' in stock')
                    ->html('<p>'.$product->getName().' is back, you can order now</p>');
                $mailer->send($email);
            }
        }

        $category = $entityManager->getRepository(Category::class)->find($formData["category_id"]);
        $material = $entityManager->getRepository(Material::class)->find($formData["material_id"]);
        if($formData["stone_id"] !== null){
            $stone = $entityManager->getRepository(Stone::class)->find($formData["stone_id"]);
        }
        if($formData["image"] !== null){
            $images = $product->getImages();
            array_push($images, $formData["image"]);  
        }else{
            $images = $product->getImages();
        }
        if($formData){
            $product->setName($formData["nom"]);
            $product->setNameEn($formData["nomEn"]);
            $product->setImages($images);
            $product->setDescription($formData["description"]);
            $product->setDescriptionEn($formData["descriptionEn"]);
            $product->setWeight(floatval($formData["weight"]));
            $product->setPrice(floatval($formData["price"]));
            $product->setPromotion($product->getPromotion());
            $product->setCategory($category);
            $product->setMaterial($material);
            if($formData["stone_id"]){
                $product->setStone($stone);
            }
            $product->setStockQty(intval($formData["stockQty"]));
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $product->setLastUpdated($now);
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route("/api/deleteImage/{id}")]
    public function editProductImage(Request $request, EntityManagerInterface $entityManager,Product $product, int $id)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["imageURL"];
        $images = $product->getImages();
        if(array_search($formData, $images)!==false){
            unset($images[array_search($formData, $images)]);
            $product->setImages(array_values($images));
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(["image"=>$product->getImages()], 200);
        }
    }

    #[Route("/api/delete/{id}", name : "deleteProduct")]
    public function deleteProduct(Product $product, EntityManagerInterface $entityManager, int $id)
    {
        $entityManager->remove($product);
        $entityManager->flush();
        return $this->json(['success' => true], 200);
    }

    #[Route("/api/categoryElem/{id}", name : "categoryId")]
    public function getCategoryId(EntityManagerInterface $entityManager, int $id)
    {
        $products = $entityManager->getRepository(Product::class)->findBy(['category' => $id]);
        return $this->json(['products' => $products], 200);
    }

    #[Route("/api/validateAdress/{email}", name:"api_validate_adress", methods:["GET"])]
    public function validateAdress(UserRepository $userRepository, $email) {
        $user = new User($email);
        $result = $user->isAdressValide($userRepository);
        return $this->json(['isAdressValide' => $result], 200);
    }

    #[Route("/api/allNovelties", methods:["GET"])]
    public function newArrivals(EntityManagerInterface $entityManager){
        $arrivals = $entityManager->getRepository(Product::class)->findByLastUpdate();
        return $this->json(["arrivals"=>$arrivals], 200);
    }
}

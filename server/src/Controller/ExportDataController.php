<?php

namespace App\Controller;
use App\Entity\AlertStock;
use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\Category;
use App\Entity\GiftWrapping;
use App\Entity\Material;
use App\Entity\Product;
use App\Entity\Promotion;
use App\Entity\PromotionalCode;
use App\Entity\Review;
use App\Entity\ShippingCountry;
use App\Entity\SizeBracelets;
use App\Entity\SizeNecklaces;
use App\Entity\SizeRings;
use App\Entity\StatsProduct;
use App\Entity\Stone;
use App\Entity\Tracking;
use App\Entity\User;
use App\Entity\WishList;
use App\Entity\WishlistItem;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\Request;

class ExportDataController extends AbstractController
{
    #[Route('/export/data', name: 'app_export_data')]
    public function index(Request $request, EntityManagerInterface $entityManager)
    {
        //declare csv data empty array
        $csvData = [];

        //get last_version csv data
        
        $version = json_decode($request->getContent(), true);
        
        // Serialize data to an array
        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer([$normalizer]);
        
        $csvData = [];
        
        $alertStock = $entityManager->getRepository(AlertStock::class)->findAll();
        if(isset($alertStock[0])){
            foreach ($alertStock as $item) {
                $csvData[] = $serializer->normalize($item);
            }
        }
        
        $cart = $entityManager->getRepository(Cart::class)->findAll();
        if(isset($cart[0])){
            foreach ($cart as $item) {
                $csvData[] = $serializer->normalize($item);
            }
        }

        // $cartItem = $entityManager->getRepository(CartItem::class)->findAll();
        // if(isset($cartItem[0])){
        //     foreach ($cartItem as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $category = $entityManager->getRepository(Category::class)->findAll();
        // if(isset($category[0])){
        //     foreach ($category as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $giftWrapping = $entityManager->getRepository(GiftWrapping::class)->findAll();
        // if(isset($giftWrapping[0])){
        //     foreach ($giftWrapping as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $material = $entityManager->getRepository(Material::class)->findAll();
        // if(isset($material[0])){
        //     foreach ($material as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $product = $entityManager->getRepository(Product::class)->findAll();
        // if(isset($product[0])){
        //     foreach ($product as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $promotion = $entityManager->getRepository(Promotion::class)->findAll();
        // if(isset($promotion[0])){
        //     foreach ($promotion as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $promotionalCode = $entityManager->getRepository(PromotionalCode::class)->findAll();
        // if(isset($promotionalCode[0])){
        //     foreach ($promotionalCode as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $review = $entityManager->getRepository(Review::class)->findAll();
        // if(isset($review[0])){
        //     foreach ($review as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }
        
        // $shippingCountry = $entityManager->getRepository(ShippingCountry::class)->findAll();
        // if(isset($shippingCountry[0])){
        //     foreach ($shippingCountry as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $sizeBracelets = $entityManager->getRepository(SizeBracelets::class)->findAll();
        // if(isset($sizeBracelets[0])){
        //     foreach ($sizeBracelets as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $sizeNecklaces = $entityManager->getRepository(SizeNecklaces::class)->findAll();
        // if(isset($sizeNecklaces[0])){
        //     foreach ($sizeNecklaces as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $sizeRings = $entityManager->getRepository(SizeRings::class)->findAll();
        // if(isset($sizeRings[0])){
        //     foreach ($sizeRings as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }
        
        // $statsProduct = $entityManager->getRepository(StatsProduct::class)->findAll();
        // if(isset($statsProduct[0])){
        //     foreach ($statsProduct as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $stone = $entityManager->getRepository(Stone::class)->findAll();
        // if(isset($stone[0])){
        //     foreach ($stone as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $tracking = $entityManager->getRepository(Tracking::class)->findAll();
        // if(isset($tracking[0])){
        //     foreach ($tracking as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $user = $entityManager->getRepository(User::class)->findAll();
        // if(isset($user[0])){
        //     foreach ($user as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $wishList = $entityManager->getRepository(WishList::class)->findAll();
        // if(isset($wishList[0])){
        //     foreach ($wishList as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // $wishlistItem = $entityManager->getRepository(WishlistItem::class)->findAll();
        // if(isset($wishlistItem[0])){
        //     foreach ($wishlistItem as $item) {
        //         $csvData[] = $serializer->normalize($item);
        //     }
        // }

        // Create the directory if it doesn't exist
        $directory = '../export';
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }

        // Define the file path $version['version']
        $filePath = $directory . '/database_'. number_format(1, 2, '.', '') . '.csv';

        // Open file in write mode
        $fp = fopen($filePath, 'w');

        // Set the headers
        if (!empty($csvData)) {
            fputcsv($fp, array_keys($csvData[0]), ",");
        }

        // Write data to CSV
        $tmp = [];
        foreach ($csvData as $data) {
            foreach ($data as $key => $value) {
                if (is_array($value)) {
                    $data[$key] = json_encode($value); // Convert array to JSON string
                }
            }
            array_push($tmp, $data);
            fputcsv($fp, $data);
        }

        fclose($fp);

        return $this->json([$tmp], 200);
    }
}

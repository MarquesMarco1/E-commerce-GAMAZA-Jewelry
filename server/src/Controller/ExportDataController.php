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
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Middleware\csvFormatter;
use Doctrine\ORM\EntityManagerInterface;

class ExportDataController extends AbstractController
{
    #[Route('/export/data', name: 'app_export_data', methods:['GET'])]
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $version = json_decode($request->getContent(), true)['version'] ?? '1.00';


        // Declare Entity
        $entities = [
            AlertStock::class,
            // Cart::class,
            // CartItem::class,
            // Category::class,
            // GiftWrapping::class,
            // Material::class,
            // Product::class, //A RAJOUTER
            // Promotion::class,
            // PromotionalCode::class,
            // Review::class, //IF A GOT TIME
            // ShippingCountry::class,
            // SizeBracelets::class,
            // SizeNecklaces::class,
            // SizeRings::class,
            // StatsProduct::class, // IF A GOT TIME
            // Stone::class,
            Tracking::class,
            // User::class, //A RAJOUTER 
            // WishList::class,
            // WishlistItem::class,
        ];

        // Create the directory if it doesn't exist
        $directory = '../export';
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }

        // Define the file path with the version number
        $stockAlert_filePath = $directory . '/stockAlert_' . number_format((float) $version, 2, '.', '') . '.csv';
        $tracking_filePath = $directory . '/tracking_' . number_format((float) $version, 2, '.', '') . '.csv';

        //Create CVS file
        $stockAlert = new csvFormatter($entityManager, AlertStock::class, $stockAlert_filePath);
        $stockAlert->alertStockFormater();

        $tracking = new csvFormatter($entityManager, Tracking::class, $tracking_filePath);
        $tracking->trackingFormater();


        //Send back csv data to front for downlaod
        $data = [];

        $dataStockAlert = file_get_contents($stockAlert_filePath);
        array_push($data, $dataStockAlert);
        $dataTracking = file_get_contents($tracking_filePath);
        array_push($data, $dataTracking);


        return $this->json($data, 200);
    }
}

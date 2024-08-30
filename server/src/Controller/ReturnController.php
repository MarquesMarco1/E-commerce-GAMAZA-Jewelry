<?php

namespace App\Controller;

use App\Entity\Bill;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use \Stripe\StripeClient;
use DateTime;

class ReturnController extends AbstractController
{
    #[Route('/api/return', name: 'app_return', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager)
    {

        $stripe = new StripeClient('sk_test_51NUbU2GrTRGUcbUFRaBZDqHBkr2o7xGKO1TMq1Nsphba1NviiZZqhbHjDt9tRrzU0u7eFc5kJAHDuNY06jvkfGDr00QfCClWJt');

        try {

            $jsonObj = json_decode($request->getContent(), true);
            $data = $jsonObj["formData"];
            $session = $stripe->checkout->sessions->retrieve($data['session_id']);
            $product = json_decode(urldecode($data["data"]));
            $products = [];
            
            foreach($product[0] as $elem ){
                $obj = $entityManager->getRepository(Product::class)->findOneBy(["keyStripe"=>$elem->price]);
                array_push($products, [$obj->getName(), $obj->getPrice(), $elem->quantity ]);
            }

            if($products && $session->customer_details->email && $product[1]){
                $bill = New Bill;
                $bill->setEmail($session->customer_details->email);
                $bill->setProducts($products);
                $bill->setShippingAmount($product[1]);
                $now = new DateTime();
                $now->format("Y-m-d H:i:s");
                $bill->setLastUpdate($now);
                $entityManager->persist($bill);
                $entityManager->flush();
            }

            return $this->json(['status' => $session->status, 'customer_email' => $session->customer_details->email], 200);

        } catch (\Throwable $e) {

            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
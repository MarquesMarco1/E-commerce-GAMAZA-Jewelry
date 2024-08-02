<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use \Stripe\StripeClient;

class ReturnController extends AbstractController
{
    #[Route('/api/return', name: 'app_return', methods: ['POST'])]
    public function index(Request $request)
    {

        $stripe = new StripeClient('sk_test_51NUbU2GrTRGUcbUFRaBZDqHBkr2o7xGKO1TMq1Nsphba1NviiZZqhbHjDt9tRrzU0u7eFc5kJAHDuNY06jvkfGDr00QfCClWJt');

        try {

            $jsonObj = json_decode($request->getContent(), true);

            $session = $stripe->checkout->sessions->retrieve($jsonObj['session_id']);

            return $this->json(['status' => $session->status, 'customer_email' => $session->customer_details->email], 200);

        } catch (\Throwable $e) {

            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
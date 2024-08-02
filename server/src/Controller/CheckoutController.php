<?php

namespace App\Controller;

// use Stripe\Forwarding\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use \Stripe\StripeClient;
use Symfony\Component\HttpFoundation\Request;

class CheckoutController extends AbstractController
{
    #[Route('/api/checkout', name: 'app_checkout', methods: ['POST'])]
    public function index(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $items = [];
        foreach ($data as $item) {
            $tmp = [];
            
        }
        $stripe = new StripeClient('sk_test_51NUbU2GrTRGUcbUFRaBZDqHBkr2o7xGKO1TMq1Nsphba1NviiZZqhbHjDt9tRrzU0u7eFc5kJAHDuNY06jvkfGDr00QfCClWJt');

        $YOUR_DOMAIN = 'http://localhost:3000';

        $checkout_session = $stripe->checkout->sessions->create([
            'ui_mode' => 'embedded',
            'mode' => 'payment',
            'line_items' => [
                [
                    'price' => 'price_1PjMbxGrTRGUcbUFMKaWTFhz',
                    'quantity' => 2,
                ]
            ],
            'allow_promotion_codes' => true,
            'shipping_address_collection' => [
                'allowed_countries' => ['FR'],
            ],
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => 0,
                            'currency' => 'eur',
                        ],
                        'display_name' => 'standard',
                        'delivery_estimate' => [
                            'maximum' => [
                                'unit' => 'business_day',
                                'value' => 15,
                            ],
                        ],
                    ],
                ],
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => 499,
                            'currency' => 'eur',
                        ],
                        'display_name' => 'Collissimo',
                        'delivery_estimate' => [
                            'maximum' => [
                                'unit' => 'business_day',
                                'value' => 5,
                            ],
                        ],
                    ],
                ],
            ],
            'payment_method_types' => ['card', 'paypal'],
            'return_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}',
        ]);

        return $this->json(['clientSecret' => $checkout_session->client_secret, 'data' => $data], 200);
    }
}
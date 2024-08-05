<?php

namespace App\Controller;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Attribute\Route;

class NotityEmailController extends AbstractController
{
    #[Route('/api/notityStock', name: 'app_notity_stock', methods:["POST"])]
    public function notityStock(MailerInterface $mailer, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $email = (new TemplatedEmail())
            ->from(new Address('gamaza@gamaza.com'))
            ->to($formData["email"])
            ->subject('Notify me when back in stock')
            ->html('<p>You will be notified when '.$formData["productName"].' is back in stock</p>');
        $mailer->send($email);
        return $this->json(["sucess"=>true], 200);
    }
}

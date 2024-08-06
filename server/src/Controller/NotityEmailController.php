<?php

namespace App\Controller;

use App\Entity\AlertStock;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;

class NotityEmailController extends AbstractController
{
    #[Route('/api/notityStock', name: 'app_notity_stock', methods:["POST"])]
    public function notityStock(MailerInterface $mailer, Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $product = $entityManager->getRepository(Product::class)->findOneBy(["id"=>$formData["productName"]]);
        $stockAlert = new AlertStock;
        $stockAlert->setEmail($formData["email"]);
        $stockAlert->setProduct($product);
        $now = new DateTime();
        $now->format("Y-m-d H:i:s");
        $stockAlert->setLastupdate($now);
        $entityManager->persist($stockAlert);
        $entityManager->flush();

        $email = (new TemplatedEmail())
            ->from(new Address('gamaza@gamaza.com'))
            ->to($formData["email"])
            ->subject('Notify me when back in stock')
            ->html('<p>You will be notified when '.$product->getName().' is back in stock</p>');
        $mailer->send($email);
        return $this->json(["sucess"=>true], 200);
    }
}

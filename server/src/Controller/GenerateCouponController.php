<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\PromotionalCode;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class GenerateCouponController extends AbstractController
{
    #[Route('/api/generateCoupon', name: 'app_generate_coupon', methods:["POST"])]
    public function index(Request $request, EntityManagerInterface $entityManager, MailerInterface $mailer)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $users = $entityManager->getRepository(User::class)->findAll();

        if($formData){
            $code = new PromotionalCode;
            $code->setCode($formData["coupon"]);
            $code->setRate($formData["reduc"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $code->setBegin($now);
            $nowend = new DateTime();
            $nowend->format("Y-m-d H:i:s");
            $end = date_add($nowend,date_interval_create_from_date_string("40 days"));
            $code->setEnd($end);
            $entityManager->persist($code);
            $entityManager->flush();

            foreach($users as $user){
                $email = (new TemplatedEmail())
                    ->from(new Address('gamaza@gamaza.com'))
                    ->to($user->getEmail())
                    ->subject('Voici une réduction rien que pour vous.')
                    ->html('<p>Voici '.$formData["reduc"].'% de réduction sur vos prochains achat en utilisant le code suivant : '.$formData["coupon"].' </p>');
                $mailer->send($email);
            }
            
            return $this->json(["sucess"=>true], 200);
        }
    }

    #[Route('/api/coupon/{code}', methods:["GET"])]
    public function coupon(string $code, EntityManagerInterface $entityManager){
        $promo = $entityManager->getRepository(PromotionalCode::class)->findByTrimmedCode($code);
        if($promo){
            return $this->json(["promo"=>$promo], 200);
        }
    }
}

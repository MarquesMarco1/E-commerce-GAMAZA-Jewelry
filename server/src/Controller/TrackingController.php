<?php

namespace App\Controller;

use App\Entity\Tracking;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use DateTime;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class TrackingController extends AbstractController
{
    #[Route('/api/tracking', name: 'app_tracking', methods:["POST"])]
    public function app_tracking(Request $request, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $user = $entityManager->getRepository(User::class)->findOneBy(["email"=>$formData["user"]]);
        $tracking = new Tracking;
        if($formData){
            $tracking->setUser($user);
            $tracking->setNumber($formData["number"]);
            $tracking->setStatus($formData["status"]);
            $now = new DateTime();
            $now->format("Y-m-d H:i:s");
            $tracking->setLastUpdate($now);
            $entityManager->persist($tracking);
            $entityManager->flush();
            return $this->json(["success"=>true], 200);
        }
    }

    #[Route('/api/UserCommand/{user}', methods:["GET"])]
    public function userCommand(EntityManagerInterface $entityManager, string $user){
        $user = $entityManager->getRepository(User::class)->findOneBy(["email"=>$user]);
        $command = $entityManager->getRepository(Tracking::class)->findBy(["user"=>$user]);
        return $this->json(["command"=>$command], 200);
    }

    #[Route('/api/setStatus', methods:["POST"])]
    public function setStatus(EntityManagerInterface $entityManager, Request $request){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $command = $entityManager->getRepository(Tracking::class)->findOneBy(["id"=>$formData["tracking_id"]]);
        $command->setStatus($formData["status"]);
        $entityManager->persist($command);
        $entityManager->flush();
        $commands = $entityManager->getRepository(Tracking::class)->findBy(["user"=>$command->getUser()]);
        return $this->json(["command"=>$commands], 200);
    }

    #[Route('/api/trackingNotLogin', methods:["POST"])]
    public function trackingNotLogin(Request $request, MailerInterface $mailer){
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $email = (new TemplatedEmail())
            ->from(new Address('gamaza@gamaza.com'))
            ->to($formData["addressTo"])
            ->subject('Command status')
            ->html('<p>Your order is in preparation before shipping.</p>');
        $mailer->send($email);

        sleep(10);
        $email = (new TemplatedEmail())
            ->from(new Address('gamaza@gamaza.com'))
            ->to($formData["addressTo"])
            ->subject('Command status')
            ->html('<p>Your order is shipping.</p>');
        $mailer->send($email);

        sleep(10);
        $email = (new TemplatedEmail())
            ->from(new Address('gamaza@gamaza.com'))
            ->to($formData["addressTo"])
            ->subject('Command status')
            ->html('<p>Your order is delivered.</p>');
        $mailer->send($email);
    
        return $this->json(["sucess"=>true], 200);
    }
}

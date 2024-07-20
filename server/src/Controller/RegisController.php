<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
class RegisController extends AbstractController
{
    #[Route('/api/auth/register', name: 'authRegister')]
    public function addArticle(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];
        $user = new User;
        if($formData){
            $user->setEmail($formData["email"]);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                $user,$formData["password"])
            );
                        
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json(['success' => true], 200);
        }
    }

    #[Route('/api/auth/login', name: 'authLogin')]
    public function authLogin(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];

        $email = $formData["email"];
        $password = $formData["password"];

        if (!$email || !$password) {
            return $this->json(['error' => 'Email and password are required'], 400);
        }

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user || !$userPasswordHasher->isPasswordValid($user, $password)) {
            return $this->json(['error' => 'Invalid informations'], 400);
        }

        return $this->json(['success' => true], 200);
    }
}

<?php

namespace App\Middleware;

use App\Repository\UserRepository;

class User
{
    private ?string $email;

    public function __construct(string $email = null)
    {
        $this->email = $email;
    }

    public function isAdmin(UserRepository $userRepository)
    {
        if ($this->email !== null) {
            $role = $userRepository->getRoles($this->email);
            if ($role[0]['roles'] === '["ROLE_ADMIN"]') {
                return true;
            } else {
                return false;
            }
        }
    }

    public function isAdressValide(UserRepository $userRepository)
    {
        if ($this->email !== null) {
            $adress = $userRepository->getFullAdress($this->email);
            if ($adress !== null & $adress[0]["country"] !== "") {
                return $adress[0]["country"];
            } else {
                return false;
            }
        }
    }
}
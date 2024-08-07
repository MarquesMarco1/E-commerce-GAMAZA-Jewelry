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
            if (count($role) > 0 && $role[0]['roles'] === '["ROLE_ADMIN"]') {
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
            $result = [];
    
            if (count($adress) > 0) {
                $fields = ['firstname', 'adress', 'city', 'region', 'zip_code', 'country', 'email', 'phone_number'];
    
                foreach ($fields as $field) {
                    if (!empty($adress[0][$field])) {
                        $result[$field] = $adress[0][$field];
                    }
                }
    
                return $result;
            } else {
                return false;
            }
        }
    }
}
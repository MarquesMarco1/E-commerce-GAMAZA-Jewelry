<?php

namespace App\Entity;

use App\Repository\ShippingThresholdRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ShippingThresholdRepository::class)]
class ShippingThreshold
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $continent = null;

    #[ORM\Column]
    private ?int $threshold = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContinent(): ?string
    {
        return $this->continent;
    }

    public function setContinent(string $continent): static
    {
        $this->continent = $continent;

        return $this;
    }

    public function getThreshold(): ?int
    {
        return $this->threshold;
    }

    public function setThreshold(int $threshold): static
    {
        $this->threshold = $threshold;

        return $this;
    }
}

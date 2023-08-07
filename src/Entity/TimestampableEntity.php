<?php

declare(strict_types=1);

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\PrePersist;
use Doctrine\ORM\Mapping\PreUpdate;

trait TimestampableEntity
{
    #[Column(type: "datetime", nullable: true)]
    protected ?DateTime $createdAt = null;

    #[Column(type: "datetime", nullable: true)]
    protected ?DateTime $updatedAt = null;


    public function getCreatedAt(): ?DateTime
    {
        return $this->createdAt;
    }

    #[PrePersist]
    public function prePersist(): static
    {
        $this->createdAt = new DateTime();
        return $this;
    }

    public function getUpdatedAt(): ?DateTime
    {
        return $this->updatedAt;
    }

    #[PreUpdate]
    public function preUpdate(): void
    {
        $this->updatedAt = new DateTime();
    }
}

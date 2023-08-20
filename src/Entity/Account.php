<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AccountRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AccountRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['account']])]
class Account
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['account'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'accounts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['account'])]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups(['account'])]
    private ?string $name = null;

    #[ORM\ManyToOne]
    #[Groups(['account'])]
    private ?Avatar $avatar = null;

    #[ORM\Column]
    #[Groups(['account'])]
    private ?int $balance = 0;

    #[ORM\Column]
    #[Groups(['account'])]
    private ?int $allowance = 0;

    #[ORM\Column(type: Types::DATE_IMMUTABLE, nullable: true)]
    #[Groups(['account'])]
    private ?DateTime $firstPayday = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['account'])]
    private ?DateTime $nextPayday = null;


    #[ORM\OneToMany(mappedBy: 'account', targetEntity: Transaction::class, orphanRemoval: true)]
    private Collection $transactions;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAllowance(): ?int
    {
        return $this->allowance;
    }

    public function setAllowance(int $allowance): static
    {
        $this->allowance = $allowance;

        return $this;
    }

    public function getFirstPayday(): ?DateTime
    {
        return $this->firstPayday;
    }

    public function setFirstPayday(?DateTime $firstPayday): static
    {
        $this->firstPayday = $firstPayday;

        return $this;
    }

    public function getNextPayday(): ?DateTime
    {
        return $this->nextPayday;
    }

    public function setNextPayday(?DateTime $nextPayday): static
    {
        $this->nextPayday = $nextPayday;

        return $this;
    }

    public function getAvatar(): ?Avatar
    {
        return $this->avatar;
    }

    public function setAvatar(?Avatar $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getBalance(): ?int
    {
        return $this->balance;
    }

    public function setBalance(int $balance): static
    {
        $this->balance = $balance;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Transaction>
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): static
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions->add($transaction);
            $transaction->setAccount($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): static
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getAccount() === $this) {
                $transaction->setAccount(null);
            }
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->name;
    }
}

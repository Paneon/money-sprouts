<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\NumericFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Enum\TransactionType;
use App\Repository\TransactionRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: TransactionRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Patch(),
    ]
)]
#[ApiFilter(NumericFilter::class, properties: ['account.id'])]
#[ApiFilter(OrderFilter::class, properties: ['effectiveOn' => 'DESC', 'id' => 'DESC'])]
class Transaction
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column]
    #[ApiProperty(description: "The value of the transaction in cents.")]
    private ?int $value = null;

    #[ORM\Column]
    #[ApiProperty(description: "True if the transaction has been factored into the balance of the user.")]
    private bool $applied = false;

    private ?DateTime $appliedAt = null;

    #[ORM\ManyToOne]
    private ?Category $category = null;

    #[ORM\Column]
    private ?bool $pocketMoney = false;

    #[ORM\Column(type: "datetime", nullable: true)]
    private ?DateTime $effectiveOn = null;

    #[ORM\ManyToOne(inversedBy: 'transactions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Account $account = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getType(): int
    {
        return $this->value < 0 ? TransactionType::EXPENSE : TransactionType::EARNING;
    }

    #[SerializedName("isExpense")]
    public function isExpense(): bool
    {
        return $this->value < 0;
    }


    #[SerializedName("isEarning")]
    public function isEarning(): bool
    {
        return $this->value > 0;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function isApplied(): ?bool
    {
        return $this->applied;
    }

    public function setApplied(bool $applied): static
    {
        $this->applied = $applied;

        if ($this->applied) {
            $this->appliedAt = new DateTime();
        } else {
            $this->appliedAt = null;
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getAppliedAt(): ?DateTime
    {
        return $this->appliedAt;
    }

    #[SerializedName("isPocketMoney")]
    public function isPocketMoney(): ?bool
    {
        return $this->pocketMoney;
    }

    public function setPocketMoney(bool $pocketMoney): static
    {
        $this->pocketMoney = $pocketMoney;

        return $this;
    }

    public function getEffectiveOn(): ?DateTime
    {
        return $this->effectiveOn;
    }

    public function setEffectiveOn(?DateTime $effectiveOn): static
    {
        $this->effectiveOn = $effectiveOn;

        return $this;
    }

    public function getAccount(): ?Account
    {
        return $this->account;
    }

    public function setAccount(?Account $account): static
    {
        $this->account = $account;

        return $this;
    }
}

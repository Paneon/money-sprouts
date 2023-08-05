<?php

declare(strict_types=1);

namespace App\Story;

use App\Factory\ExpenseFactory;
use Zenstruck\Foundry\Story;

final class DefaultTransactionStory extends Story
{
    public function build(): void
    {
        ExpenseFactory::createMany(100);
    }
}

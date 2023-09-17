<?php

declare(strict_types=1);

namespace App\Story;

use App\Factory\AccountFactory;
use App\Factory\AvatarFactory;
use App\Factory\ExpenseFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Story;

final class DefaultTransactionStory extends Story
{
    public function build(): void
    {
        AvatarFactory::createOne();
        UserFactory::createOne();
        AccountFactory::createOne();
        ExpenseFactory::createMany(10);
    }
}

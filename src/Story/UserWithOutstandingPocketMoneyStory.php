<?php

declare(strict_types=1);

namespace App\Story;

use App\Entity\User;
use App\Factory\AccountFactory;
use App\Factory\AvatarFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Story;

/**
 * @method static User user()
 */
final class UserWithOutstandingPocketMoneyStory extends Story
{
    public function build(): void
    {
        AvatarFactory::createOne();
        UserFactory::createOne();
        AccountFactory::createOne();
    }
}

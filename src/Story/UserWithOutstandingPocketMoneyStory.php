<?php

declare(strict_types=1);

namespace App\Story;

use App\Entity\User;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Story;

/**
 * @method static User user()
 */
final class UserWithOutstandingPocketMoneyStory extends Story
{
    public function build(): void
    {
        $this->addState(
            'user',
            UserFactory::new()
                ->tracked()
                ->withAllowance(1000)
                ->nextPaydayYesterday()
        );
    }
}

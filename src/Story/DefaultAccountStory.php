<?php

declare(strict_types=1);

namespace App\Story;

use App\Entity\Category;
use App\Factory\AccountFactory;
use App\Factory\AvatarFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Story;

/**
 * @method static Category earn()
 * @method static Category spent()
 */
final class DefaultAccountStory extends Story
{
    public function build(): void
    {
        AvatarFactory::createOne();
        $this->addState('user', UserFactory::createOne());
        $this->addState('account', AccountFactory::createOne());
    }
}

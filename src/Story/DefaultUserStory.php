<?php

declare(strict_types=1);

namespace App\Story;

use App\Factory\UserFactory;
use Zenstruck\Foundry\Story;

final class DefaultUserStory extends Story
{
    public function build(): void
    {
        UserFactory::createMany(10);
    }
}

<?php

declare(strict_types=1);

namespace App\Story;

use App\Entity\Category;
use App\Factory\CategoryFactory;
use Zenstruck\Foundry\Story;

/**
 * @method static Category earn()
 * @method static Category spent()
 */
final class DefaultCategoriesStory extends Story
{
    public function build(): void
    {
        $this->addState('earn', CategoryFactory::createOne([
            'name' => 'Pocket Money',
        ]));
        $this->addState('spent', CategoryFactory::createOne([
            'name' => 'Expense',
        ]));
    }
}

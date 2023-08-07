<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Avatar;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AvatarField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;

class AvatarCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Avatar::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield AvatarField::new('url')->onlyOnIndex();
        yield UrlField::new('url');
    }
}

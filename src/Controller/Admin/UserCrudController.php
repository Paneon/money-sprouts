<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\User;
use App\Trait\HasCurrencyFormatter;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AvatarField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserCrudController extends AbstractCrudController
{
    use HasCurrencyFormatter;

    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('name');
        yield AvatarField::new('avatarUrl')->hideOnForm();
        yield AssociationField::new('avatar')->hideOnIndex();
        yield EmailField::new('email');
        yield ArrayField::new('roles');
        yield BooleanField::new('tracked');
        yield DateField::new('nextPayday');
        yield NumberField::new('allowance')
            ->addCssClass('text-success')
            ->formatValue(function ($value) {
                return $this->formatCurrency($value);
            });
        yield NumberField::new('balance')->addCssClass('text-bg-primary text-white')
            ->hideOnForm()
            ->formatValue(function ($value) {
                return $this->formatCurrency($value);
            });
    }
}

<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Transaction;
use App\Enum\TransactionType;
use App\Trait\HasCurrencyFormatter;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class TransactionCrudController extends AbstractCrudController
{
    use HasCurrencyFormatter;

    public static function getEntityFqcn(): string
    {
        return Transaction::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('title');
        yield AssociationField::new('user');
        yield AssociationField::new('category');
        yield ChoiceField::new('type')
            ->setChoices([
                '+' => TransactionType::EARNING,
                '-' => TransactionType::EXPENSE,
            ])
            ->renderAsBadges([
                TransactionType::EARNING => 'success',
                TransactionType::EXPENSE => 'danger',
            ]);
        yield BooleanField::new('applied');
        yield BooleanField::new('pocketMoney');
        yield NumberField::new('value')->formatValue(function ($value) {
            return $this->formatCurrency($value);
        });
    }
}

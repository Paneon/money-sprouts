<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Transaction;
use App\Enum\TransactionType;
use App\Trait\HasCurrencyFormatter;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\BooleanFilter;

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
        yield AssociationField::new('account');
        yield AssociationField::new('category');
        yield ChoiceField::new('type')
            ->setChoices([
                '+' => TransactionType::EARNING,
                '-' => TransactionType::EXPENSE,
            ])
            ->renderAsBadges([
                TransactionType::EARNING => 'success',
                TransactionType::EXPENSE => 'danger',
            ])
            ->hideOnForm();
        yield DateField::new('effectiveOn');
        yield BooleanField::new('applied')->hideOnForm();
        yield BooleanField::new('pocketMoney');
        yield NumberField::new('value', 'Value (in cent)')->formatValue(function ($value) {
            return $this->formatCurrency($value);
        });
    }

    public function configureActions(Actions $actions): Actions
    {
        $disableIfApplied = function (Action $action) {
            return $action->displayIf(function ($entity) {
                // Only display the 'edit' action if the transaction is not applied
                return !$entity->isApplied();
            });
        };

        return $actions
            ->update(Crud::PAGE_INDEX, Action::EDIT, $disableIfApplied)
            ->update(Crud::PAGE_DETAIL, Action::EDIT, $disableIfApplied)
            ->update(Crud::PAGE_INDEX, Action::DELETE, $disableIfApplied)
            ->update(Crud::PAGE_DETAIL, Action::DELETE, $disableIfApplied);
    }

    public function configureFilters(Filters $filters): Filters
    {
        return parent::configureFilters($filters)
            ->add(BooleanFilter::new('applied')->setFormTypeOption('expanded', true))
            ->add(BooleanFilter::new('pocketMoney')->setFormTypeOption('expanded', true))
            ->add('account')
            ->add('category');
    }
}

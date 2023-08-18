<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use _PHPStan_d55c4f2c2\Nette\Neon\Exception;
use App\Entity\Avatar;
use App\Entity\Category;
use App\Entity\Transaction;
use App\Entity\User;
use App\Repository\TransactionRepository;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\UserMenu;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class DashboardController extends AbstractDashboardController
{
    public function __construct(private readonly TransactionRepository $transactionRepository)
    {
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $notApprovedTransactions = $this->transactionRepository->findNotApplied();

        return $this->render('admin/index.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Money Sprouts');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToUrl('App', 'fas fa-home', $this->generateUrl('app_home'));
        yield MenuItem::linkToUrl('API Docs', 'fas fa-book', $this->generateUrl('api_doc'));
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-dashboard');
        yield MenuItem::section('User');
        yield MenuItem::linkToCrud('User', 'fa-solid fa-user', User::class);
        yield MenuItem::linkToCrud('Transaction', 'fa-solid fa-money-bill-transfer', Transaction::class);
        yield MenuItem::section('General');
        yield MenuItem::linkToCrud('Avatar', 'fa-solid fa-image', Avatar::class);
        yield MenuItem::linkToCrud('Category', 'fa-solid fa-list', Category::class);
    }

    /**
     * @throws Exception
     */
    public function configureUserMenu(UserInterface $user): UserMenu
    {
        if (!$user instanceof User) {
            throw new Exception('Invalid User Entity');
        }

        return parent::configureUserMenu($user)->setAvatarUrl($user->getAvatar()?->getUrl());
    }
}

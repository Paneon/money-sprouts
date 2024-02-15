<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    #[Route('/dashboard', name: 'dashboard')]
    #[Route('/accounts/{user}/', name: 'accounts_dashboard')]
    #[Route('/accounts/{user}/balance', name: 'accounts_balance')]
    #[Route('/accounts/{user}/history', name: 'accounts_history')]
    #[Route('/accounts/{user}/plan', name: 'accounts_plan')]
    #[Route(
        '/{page}',
        name: 'app_frontend',
        condition: "params['page'] not in ['admin','login','logout', 'api', '_profiler']"
    )]
    #[Route(
        '/account/{user}/{page}',
        name: 'app_user_page'
    )]
    public function react(): Response
    {
        return $this->render('home/index_react.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }


}

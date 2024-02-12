<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    #[Route('/dashboard', name: 'user_dashboard')]
    #[Route('/accounts/{user}/', name: 'account_show')]
    public function react(): Response
    {
        return $this->render('home/index_react.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route(
        '/{page}',
        name: 'app_frontend',
        condition: "params['page'] not in ['admin','login','logout', 'api', '_profiler']"
    )]
    #[Route(
        '/account/{user}/{page}',
        name: 'app_user_page'
    )]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

}

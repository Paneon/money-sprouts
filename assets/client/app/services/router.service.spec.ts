import { TestBed } from '@angular/core/testing';
import { RouterService } from './router.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutePath } from '../enum/routepath';

describe('RouterService', () => {
    let service: RouterService;
    let mockRouter: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
        }).compileComponents();

        mockRouter = TestBed.inject(Router);
        service = TestBed.inject(RouterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getUrl', () => {
        it('should return the current URL when getURL is called', () => {
            const routerService = new RouterService(mockRouter);
            const mockUrl = '/home';
            jest.spyOn(mockRouter, 'url', 'get').mockReturnValue(mockUrl);
            const result = routerService.getURL();
            expect(result).toBe(mockUrl);
        });
    });

    describe('navigateToRoute', () => {
        it('should navigate to home route', () => {
            const routerService = new RouterService(mockRouter);
            const navigateSpy = jest.spyOn(routerService.router, 'navigate');
            routerService.navigateToRoute(RoutePath.Home);
            expect(navigateSpy).toHaveBeenCalledWith([RoutePath.Home]);
        });
    });

    describe('navigateToRouteForAccountName', () => {
        it('should navigate to the correct route', () => {
            const routerService = new RouterService(mockRouter);
            const mockPath = RoutePath.Dashboard;
            const mockAccountName = 'testAccount';
            const mockTarget = 'account/testAccount/dashboard';
            const navigateSpy = jest.spyOn(mockRouter, 'navigate');

            routerService.navigateToRouteForAccountName(
                mockPath,
                mockAccountName
            );

            expect(navigateSpy).toHaveBeenCalledWith([mockTarget]);
        });

        it('should not allow an empty account name', () => {
            const routerService = new RouterService(mockRouter);
            const mockPath = RoutePath.Dashboard;
            const mockAccountName = '';

            expect(() => {
                routerService.navigateToRouteForAccountName(
                    mockPath,
                    mockAccountName
                );
            }).toThrow();
        });
    });

    describe('navigateToAccountDashboard', () => {
        it('should navigate to dashboard route for a given account name', () => {
            const routerService = new RouterService(mockRouter);
            const mockAccountName = 'testAccount';

            const navigateSpy = jest.spyOn(
                routerService,
                'navigateToRouteForAccountName'
            );

            routerService.navigateToAccountDashboard(mockAccountName);

            expect(navigateSpy).toHaveBeenCalledWith(
                RoutePath.AccountDashboard,
                mockAccountName
            );
        });
    });
});

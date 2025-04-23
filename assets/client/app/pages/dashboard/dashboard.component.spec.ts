import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RouterService } from '../../services/router.service';
import { RoutePath } from '../../enum/routepath';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
})
class MockPageHeaderComponent {}

class MockAccountService {
    currentAccount$ = of({
        id: '1',
        nextPayday: new Date(),
        user: 'jasmine',
        name: 'jasmine',
        avatar: {
            id: 1,
            url: 'www.test.de',
        },
        balance: 120,
        allowance: 2,
        firstPayday: new Date(),
    });
    refreshAccount = jest.fn();
}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockAccountService: jest.Mocked<AccountService>;
    let mockRouterService: jest.Mocked<RouterService>;

    beforeEach(async () => {
        mockAccountService = {
            currentAccount$: of({
                id: '1',
                nextPayday: new Date(),
                user: 'jasmine',
                name: 'jasmine',
                avatar: {
                    id: 1,
                    url: 'www.test.de',
                },
                balance: 120,
                allowance: 2,
                firstPayday: new Date(),
            }),
            refreshAccount: jest.fn(),
        } as any;

        mockRouterService = {
            getURL: jest.fn().mockReturnValue('some/url/segment'),
            navigateToRouteForAccountName: jest.fn(),
        } as any;

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, TranslateModule.forRoot()],
            declarations: [DashboardComponent, MockPageHeaderComponent],
            providers: [
                { provide: AccountService, useValue: mockAccountService },
                { provide: RouterService, useValue: mockRouterService },
                TranslateService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have sections initialized', () => {
        expect(component.sections.length).toBeGreaterThan(0);
    });

    it('should subscribe and handle account data', (done) => {
        component.account$.subscribe((account) => {
            expect(account).toBeDefined();
            expect(mockAccountService.refreshAccount).toHaveBeenCalledWith(
                account.id
            );
            done();
        });
    });

    it('should navigate to the correct section', () => {
        const section = 'DASHBOARD.SECTION_NAME.OVERVIEW';
        component.goToSection(section);
        expect(
            mockRouterService.navigateToRouteForAccountName
        ).toHaveBeenCalledWith(RoutePath.Overview, component.name);
    });
});

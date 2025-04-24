import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-multilanguage',
    template: '<div></div>',
})
class MockMultilanguageComponent {}

describe('PageHeaderComponent', () => {
    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;
    let translateService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, TranslateModule.forRoot()],
            declarations: [PageHeaderComponent, MockMultilanguageComponent],
            providers: [TranslateService],
        }).compileComponents();

        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        translateService = TestBed.inject(TranslateService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

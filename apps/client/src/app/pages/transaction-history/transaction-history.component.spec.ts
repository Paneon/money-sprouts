import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TransactionHistoryComponent } from './transaction-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
})
class MockPageHeaderComponent {}

describe('TransactionHistoryComponent', () => {
    let component: TransactionHistoryComponent;
    let fixture: ComponentFixture<TransactionHistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [
                TransactionHistoryComponent,
                MockPageHeaderComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

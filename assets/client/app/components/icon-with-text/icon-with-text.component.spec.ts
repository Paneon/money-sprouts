import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconWithTextComponent } from './icon-with-text.component';

describe('IconWithTextComponent', () => {
    let component: IconWithTextComponent;
    let fixture: ComponentFixture<IconWithTextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconWithTextComponent],
        })
            .overrideComponent(IconWithTextComponent, {
                set: { template: '<div></div>' }, // Use a simplified template
            })
            .compileComponents();

        fixture = TestBed.createComponent(IconWithTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

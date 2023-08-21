import { Component, OnInit } from '@angular/core';
import { User } from '@money-sprouts/shared/domain';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'money-sprouts-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
    user$: Observable<User | null>;
    activeTab: 'spend' | 'earn' = 'spend';
    originalBalance: number | null = null;

    constructor(private userService: UserService, private http: HttpClient) {}

    ngOnInit() {
        this.user$ = this.userService.currentUser$;
        this.originalBalance = this.userService.getCurrentBalance();
    }

    switchTab(tab: 'spend' | 'earn'): void {
        this.activeTab = tab;
    }

    onCalculateAmount(amount: number) {
        this.userService.updateBalanceTemporarily(amount);
    }

    onResetBalance(): void {
        console.log('onResetBalance triggered');
        this.userService.resetBalanceToOriginal();
    }

    onApplyChanges() {
        this.userService.applyBalanceChange();
    }
}

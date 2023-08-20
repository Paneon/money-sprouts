import { Component, OnInit } from '@angular/core';
import { User } from '@money-sprouts/shared/domain';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'money-sprouts-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
    user$: Observable<User | null>;
    activeTab: 'spend' | 'earn' = 'spend';

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.user$ = this.userService.currentUser$.pipe(
            debounceTime(300), // waits 300ms between emisssions
            distinctUntilChanged((prevUser, currUser) => {
                return prevUser && currUser
                    ? prevUser.id === currUser.id
                    : prevUser === currUser;
            })
        );
    }

    switchTab(tab: 'spend' | 'earn'): void {
        this.activeTab = tab;
    }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    Observable,
    Subject,
    takeUntil,
} from 'rxjs';
import { AccountService } from '../../services/account.service';
import { Account, User } from '@money-sprouts/shared/domain';

interface Section {
    name: string;
    image: string;
}

@Component({
    selector: 'money-sprouts-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    username: string;
    account$: Observable<Account>;
    users$: Observable<User[]>;

    urlSegments: string;

    sections: Section[] = [
        {
            name: 'overview',
            image: './assets/images/overview.png',
        },
        {
            name: 'history',
            image: './assets/images/history.png',
        },
        {
            name: 'plan',
            image: './assets/images/plan.png',
        },
    ];

    private destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.sections;
        const urlSegments = this.router.url.split('/');
        this.username = urlSegments[2];
        this.account$ = this.accountService.currentAccount$.pipe(
            debounceTime(300), // waits 300ms between emisssions
            distinctUntilChanged((prevUser, currUser) => {
                return prevUser && currUser
                    ? prevUser.id === currUser.id
                    : prevUser === currUser;
            })
        );

        this.account$.subscribe((value) => {
            console.log('Account subscriber', value);
            this.accountService.getAccount(value.id).subscribe((response) => {
                console.log('account by id ', response);
                return response;
            });
        });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.router.url.split('/')[2]),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((username) => {
                this.username = username;
                this.accountService.getAccountByName(username);
            });
    }

    goToSection(section: string) {
        if (!this.username) {
            console.error('No username available!');
            return;
        }
        this.router.navigate([`user/${this.username}/${section}`]);
    }
}

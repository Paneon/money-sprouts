import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'money-sprouts-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit, OnDestroy {
    @Input() avatarFile = '';
    urlSegment = '';
    smallPaths: string[] = ['dashboard', 'overview', 'history', 'plan'];
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router) {}

    ngOnInit() {
        this.urlSegment = this.router.url.split('/')[2];
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => {
                this.urlSegment = event.url.split('/')[2];
            });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getClass() {
        if (this.urlSegment === 'userselection') {
            return 'avatar-icon';
        } else if (this.smallPaths.includes(this.urlSegment)) {
            console.log('blub-small');
            return 'avatar-icon--small';
        } else {
            return '';
        }
    }

    getAvatarFile() {
        return this.avatarFile;
    }
}

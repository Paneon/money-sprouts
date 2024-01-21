import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'money-sprouts-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit, OnDestroy {
    @Input() avatarFile = '';
    @Output() classChange = new EventEmitter<string>();
    urlSegment = '';
    smallPaths: string[] = ['dashboard', 'overview', 'history', 'plan'];
    private destroy$ = new Subject<void>();

    constructor(private readonly router: Router) {}

    ngOnInit() {
        this.urlSegment = this.router.url.split('/')[3];
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => {
                this.urlSegment = event.url.split('/')[3];
            });
    }

    getClass() {
        if (this.smallPaths.includes(this.urlSegment)) {
            return 'avatar-icon--small';
        } else {
            return 'avatar-icon';
        }
    }

    getAvatarFile() {
        return this.avatarFile;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

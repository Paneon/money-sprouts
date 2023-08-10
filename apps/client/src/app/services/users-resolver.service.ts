import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<User[]> {
    constructor(private userService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<User[]> {
        return this.userService.getUsers();
    }
}

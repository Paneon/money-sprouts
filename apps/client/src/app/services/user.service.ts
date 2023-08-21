import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject,
    Observable,
    catchError,
    shareReplay,
    tap,
    throwError,
} from 'rxjs';
import { User } from '@money-sprouts/shared/domain';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable().pipe(
        tap((user) => console.log('Emission from currentUser$: ', user)),
        shareReplay(1)
    );
    loading = new BehaviorSubject<boolean>(false);

    // Declare users$ as an Observable using shareReplay and cache last emitted value
    private users$ = this.api.getUsers().pipe(
        tap((users) => console.log('Fetched users: ', users)),
        catchError((err) => {
            console.error('Error fetching users:', err);
            return throwError(() => err);
        }),
        shareReplay(1)
    );

    private originalBalance: number | null = null;
    private currentBalance: number | null = null;

    setInitialBalance(balance: number): void {
        this.originalBalance = balance;
        this.currentBalance = balance;
    }

    private balanceUpdateStatus = new BehaviorSubject<string>('');
    public balanceUpdateStatus$ = this.balanceUpdateStatus.asObservable();

    constructor(private http: HttpClient, private api: ApiService) {
        const savedUser = localStorage.getItem('selectedUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    // fetch all users and use tap to store them locally
    getUsers(): Observable<User[]> {
        return this.users$;
    }

    getUserByUsername(username: string): void {
        this.users$.subscribe((users) => {
            const user = users.find((user) => user.name === username);
            // currentUserSubject only emits new value if user is not the same as the current one
            if (
                !this.currentUserSubject.getValue() ||
                (user && user.id !== this.currentUserSubject.getValue().id)
            ) {
                this.currentUserSubject.next(user);
            }
        });
    }

    setUser(user: User) {
        console.log(
            'Storing selected user in local storage: ',
            JSON.stringify(user)
        );
        localStorage.setItem('selectedUser', JSON.stringify(user));
        console.log('Setting user:', user);
        this.currentUserSubject.next(user);

        this.setInitialBalance(user.balance);
    }

    getAvatarForUser(user: User | null): string {
        if (!user) return '';

        switch (user.name) {
            case 'Thea':
                return 'assets/images/avatar_female.png';
            case 'Robert':
                return 'assets/images/avatar_male.png';
            default:
                return '';
        }
    }

    // Method to get the current balance
    getCurrentBalance(): number | null {
        const currentUser = this.currentUserSubject.getValue();
        return currentUser?.balance || null;
    }

    // Method to update the balance temporarily
    updateBalanceTemporarily(amount: number): void {
        const currentUser = this.currentUserSubject.getValue();
        if (currentUser && typeof currentUser.balance === 'number') {
            currentUser.balance -= amount;
            this.currentUserSubject.next(currentUser);
        }
    }

    // Method to reset the balance to the original value
    resetBalanceToOriginal(): void {
        console.log('resetBalanceToOriginal triggered');
        const currentUser = this.currentUserSubject.getValue();
        this.originalBalance = currentUser.balance;

        // Log the values and conditions
        console.log('currentUser:', currentUser);
        console.log('typeof currentUser.balance:', typeof currentUser.balance);
        console.log('this.originalBalance:', this.originalBalance);

        if (
            currentUser &&
            typeof currentUser.balance === 'number' &&
            this.originalBalance !== null
        ) {
            currentUser.balance = this.originalBalance;
            console.log('resetBalance: ', currentUser.balance);
            this.currentUserSubject.next(currentUser);
        }
    }

    applyBalanceChange(): void {
        const currentUserBalance = this.getCurrentBalance();
        if (currentUserBalance !== null) {
            this.http
                .patch('/api/transactions/:userId', {
                    newBalance: currentUserBalance,
                })
                .subscribe({
                    next: () => {
                        this.balanceUpdateStatus.next('success');
                        this.originalBalance = this.currentBalance;
                    },
                    error: (error) => {
                        console.error('Error updating balance: ', error);
                        this.balanceUpdateStatus.next('error');
                        const currentBalance = this.getCurrentBalance();
                        if (currentBalance !== null) {
                            this.updateBalanceTemporarily(
                                this.originalBalance - currentBalance
                            );
                        }
                    },
                });
        }
    }

    logoutOrDeselectUser() {
        this.loading.next(true);
        localStorage.removeItem('selectedUser');
        this.currentUserSubject.next(null);
        this.loading.next(false);
    }
}

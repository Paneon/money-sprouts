import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction, User } from '@money-sprouts/shared/domain';
import {
    Observable,
    Subject,
    combineLatest,
    map,
    of,
    switchMap,
    takeUntil,
} from 'rxjs';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import {
    debounceTime,
    distinctUntilChanged,
    shareReplay,
} from 'rxjs/operators';

interface TransactionData {
    transactions: {
        incomes: Transaction[];
        expenses: Transaction[];
    };
    classes: string[];
}

interface CombinedDataTransaction {
    transactions: TransactionData;
    maxLength: number;
}

@Component({
    selector: 'money-sprouts-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
    user$: Observable<User | null>;

    combinedDataTransaction$: Observable<CombinedDataTransaction>;
    latestCombinedData: CombinedDataTransaction | null = null;

    initialItems = 5;
    displayedItems = this.initialItems;

    Math = Math;

    public isExpanded = false;

    private destroy$ = new Subject<void>();

    constructor(
        private userService: UserService,
        private transactionService: TransactionService
    ) {}

    ngOnInit() {
        this.user$ = this.userService.currentUser$.pipe(
            distinctUntilChanged((prevUser, currUser) => {
                return prevUser && currUser
                    ? prevUser.id === currUser.id
                    : prevUser === currUser;
            }),
            debounceTime(300) // waits 300ms between emisssions
        );

        const transactions$ = this.user$.pipe(
            switchMap((user) => {
                console.log(
                    'transaction-history, ngOnInit, switchMap, user$ emitted:',
                    user
                );

                if (user && user.id) {
                    return this.transactionService.getTransactionsByUserId(
                        user.id
                    );
                } else {
                    return of([]);
                }
            }),
            map((transactions) => {
                console.log(
                    'Loaded transactions in ngOnInit via user$:',
                    transactions
                );
                const incomes = transactions.filter(
                    (transaction) => transaction.type === 1
                );
                const expenses = transactions.filter(
                    (transaction) => transaction.type === 2
                );
                const classes = [...incomes, ...expenses].map((transaction) =>
                    transaction.applied ? 'applied' : 'not-applied'
                );
                return {
                    transactions: {
                        incomes,
                        expenses,
                    },
                    classes,
                };
            }),
            shareReplay(1)
        );

        const maxLength$ = transactions$.pipe(
            map((transactionData) =>
                this.Math.max(
                    transactionData.transactions.incomes.length,
                    transactionData.transactions.expenses.length
                )
            )
        );

        this.combinedDataTransaction$ = combineLatest([
            transactions$,
            maxLength$,
        ]).pipe(
            map(([transactions, maxLength]) => {
                return {
                    transactions,
                    maxLength,
                };
            }),
            shareReplay(1),
            takeUntil(this.destroy$)
        );

        this.combinedDataTransaction$.subscribe((data) => {
            console.log(
                'subscribed to transactions to get latestCombinedData',
                data
            );
            this.latestCombinedData = data;
        });
    }

    showMore() {
        if (this.latestCombinedData) {
            this.displayedItems = Math.min(
                this.displayedItems + 5,
                this.latestCombinedData.maxLength
            );
        }
    }

    hideExtra() {
        this.displayedItems = -5;
        if (this.displayedItems < this.initialItems) {
            this.displayedItems = this.initialItems;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

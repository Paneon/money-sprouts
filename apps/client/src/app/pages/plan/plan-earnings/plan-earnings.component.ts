import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Chore {
    id: string;
    name: string;
    iconPath: string;
    sum: number;
    selected?: boolean;
}

@Component({
    selector: 'money-sprouts-plan-earnings',
    templateUrl: './plan-earnings.component.html',
    styleUrls: ['./plan-earnings.component.scss'],
})
export class PlanEarningsComponent {
    chores: Chore[] = [
        {
            id: '1',
            name: 'PLAN.TAB_EARN.CHORE_NAME.VACUUM',
            iconPath: './assets/images/chore_vacuum.png',
            sum: 1.0,
            selected: false,
        },
        {
            id: '2',
            name: 'PLAN.TAB_EARN.CHORE_NAME.TIDY_ROOM',
            iconPath: './assets/images/chore_tidy-room.png',
            sum: 1.0,
            selected: false,
        },
        {
            id: '3',
            name: 'PLAN.TAB_EARN.CHORE_NAME.TRASH',
            iconPath: './assets/images/chore_take-out-trash.png',
            sum: 0.5,
            selected: false,
        },
        {
            id: '4',
            name: 'PLAN.TAB_EARN.CHORE_NAME.SET_TABLE',
            iconPath: './assets/images/chore_set-table.png',
            sum: 0.5,
            selected: false,
        },
    ];

    selectedChore: Chore | null = null;
    message: string | null = '';
    icon: string | null = null;
    @Output() calculateAmount = new EventEmitter<number>();
    @Output() applyChanges = new EventEmitter<{
        title: string;
        amount: number;
    }>();

    constructor(private translate: TranslateService) {}

    onChoreSelect(chore: Chore) {
        if (chore.selected) {
            this.chores.forEach((c) => {
                if (c.id !== chore.id) c.selected = false;
            });
            this.selectedChore = chore;
        } else {
            this.selectedChore = null;
        }
    }

    calculate() {
        if (this.selectedChore) {
            console.log('selected Sum:', this.selectedChore.sum);
            const formatedAmount = this.selectedChore.sum * 100;
            this.calculateAmount.emit(formatedAmount);
            this.icon = 'ℹ';
            this.message = 'PLAN.TAB_EARN.MESSAGE_CONFIRM';
        }
    }

    apply() {
        if (this.selectedChore) {
            this.translate
                .get(this.selectedChore.name)
                .subscribe((translatedTitle) => {
                    const title = translatedTitle;
                    const amount = this.selectedChore.sum * -1000;

                    console.log(
                        'selected name & sum:',
                        translatedTitle,
                        amount
                    );

                    this.applyChanges.emit({ title, amount });
                });

            this.message = 'PLAN.TAB_EARN.MESSAGE_SUCCESS';
            this.icon = '✔';
        } else {
            this.icon = '⚠';
            this.message = 'PLAN.TAB_EARN.ERROR_MESSAGE.GENERAL';
        }
    }

    onSubmit() {
        console.log('Form submitted!');
    }
}

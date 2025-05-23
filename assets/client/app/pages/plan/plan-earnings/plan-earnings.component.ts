import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Chore {
    id: string;
    name: string;
    iconPath: string;
    sum: number;
    selected?: boolean;
    calculated?: boolean;
}

@Component({
    selector: 'money-sprouts-plan-earnings',
    templateUrl: './plan-earnings.component.html',
    styleUrls: ['./plan-earnings.component.scss'],
    imports: [CommonModule, TranslatePipe, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEarningsComponent {
    chores: Chore[] = [
        {
            id: '1',
            name: 'PLAN.TAB_EARN.CHORE_NAME.VACUUM',
            iconPath: './assets/images/chore_vacuum.png',
            sum: 1.0,
            selected: false,
            calculated: false,
        },
        {
            id: '2',
            name: 'PLAN.TAB_EARN.CHORE_NAME.TIDY_ROOM',
            iconPath: './assets/images/chore_tidy-room.png',
            sum: 1.0,
            selected: false,
            calculated: false,
        },
        {
            id: '3',
            name: 'PLAN.TAB_EARN.CHORE_NAME.TRASH',
            iconPath: './assets/images/chore_take-out-trash.png',
            sum: 0.5,
            selected: false,
            calculated: false,
        },
        {
            id: '4',
            name: 'PLAN.TAB_EARN.CHORE_NAME.SET_TABLE',
            iconPath: './assets/images/chore_set-table.png',
            sum: 0.5,
            selected: false,
            calculated: false,
        },
    ];

    selectedChore: Chore | null = null;
    message: string | null = '';
    errorMessage: string | null = '';
    icon: string | null = null;
    @Output() readonly calculateAmount = new EventEmitter<number>();
    @Output() readonly applyChanges = new EventEmitter<{
        title: string;
        amount: number;
    }>();
    @Output() readonly resetBalance = new EventEmitter<void>();

    // Computed properties
    readonly hasSelectedChore = computed(() => this.selectedChore !== null);
    readonly hasCalculatedChore = computed(() => this.selectedChore?.calculated ?? false);
    readonly hasMessages = computed(() => this.message !== '' || this.errorMessage !== '');
    readonly isValidForCalculation = computed(() => this.hasSelectedChore() && !this.hasCalculatedChore());
    readonly isValidForApplication = computed(() => this.hasSelectedChore() && this.hasCalculatedChore());

    constructor(private readonly translate: TranslateService) {}

    onChoreSelect(chore: Chore) {
        if (chore.selected) {
            this.clearAction();
            this.chores.forEach((c) => {
                c.selected = c.id === chore.id;
                if (c.id !== chore.id) {
                    c.calculated = false;
                }
            });
            this.selectedChore = chore;
            const formatedAmount = chore.sum * 100;
            this.calculateAmount.emit(formatedAmount);
            this.icon = 'ℹ';
            this.message = 'PLAN.TAB_EARN.MESSAGE_CONFIRM';
            chore.calculated = true;
        } else {
            this.selectedChore = null;
            this.clearAction();
        }
    }

    private clearAction(): void {
        this.clearMessages();
        this.resetBalance.emit();
    }

    private clearMessages(): void {
        this.message = '';
        this.errorMessage = '';
        this.icon = null;
    }

    calculate() {
        if (this.isValidForCalculation()) {
            const formatedAmount = this.selectedChore!.sum * 100;
            this.calculateAmount.emit(formatedAmount);
            this.icon = 'ℹ';
            this.message = 'PLAN.TAB_EARN.MESSAGE_CONFIRM';
            this.selectedChore!.calculated = true;
        } else if (this.hasCalculatedChore()) {
            this.message = '';
            this.errorMessage = 'PLAN.TAB_EARN.MESSAGE_DENY';
            this.icon = '⚠';
        } else {
            this.clearMessages();
            this.icon = '⚠';
            this.errorMessage = 'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION';
        }
    }

    apply() {
        if (this.isValidForApplication()) {
            this.clearMessages();
            this.translate.get(this.selectedChore!.name).subscribe((translatedTitle) => {
                const title = translatedTitle;
                const amount = this.selectedChore!.sum * 100;

                this.applyChanges.emit({ title, amount });
                this.resetChoreSelection();
            });

            this.message = 'PLAN.TAB_EARN.MESSAGE_SUCCESS';
            this.icon = '✔';
        } else {
            this.clearMessages();
            this.icon = '⚠';
            this.errorMessage = 'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION';
        }
    }

    private resetChoreSelection() {
        this.selectedChore = null;
    }

    onSubmit() {
        console.log('Form submitted!');
    }
}

export interface Chore {
    id: string;
    name: string;
    iconPath: string;
    value: number;
    selected?: boolean;
    calculated?: boolean;
}

export const chores: Chore[] = [
    {
        id: '1',
        name: 'PLAN.TAB_EARN.CHORE_NAME.VACUUM',
        iconPath: './assets/images/chore_vacuum.png',
        value: 100,
    },
    {
        id: '2',
        name: 'PLAN.TAB_EARN.CHORE_NAME.TIDY_ROOM',
        iconPath: './assets/images/chore_tidy-room.png',
        value: 100,
    },
    {
        id: '3',
        name: 'PLAN.TAB_EARN.CHORE_NAME.TRASH',
        iconPath: './assets/images/chore_take-out-trash.png',
        value: 50,
        selected: false,
        calculated: false,
    },
    {
        id: '4',
        name: 'PLAN.TAB_EARN.CHORE_NAME.SET_TABLE',
        iconPath: './assets/images/chore_set-table.png',
        value: 50,
        selected: false,
        calculated: false,
    },
];
//
//     selectedChore: Chore | null = null;
//     message: string | null = '';
//     errorMessage: string | null = '';
//     icon: string | null = null;
//     @Output() calculateAmount = new EventEmitter<number>();
//     @Output() applyChanges = new EventEmitter<{
//         title: string;
//         amount: number;
//     }>();
//     @Output() resetBalance = new EventEmitter<void>();
//
//     constructor(private readonly translate: TranslateService) {}
//
//
//     private clearAction(): void {
//         this.clearMessages();
//         this.resetBalance.emit();
//     }
//
//     private clearMessages(): void {
//         this.message = '';
//         this.errorMessage = '';
//         this.icon = null;
//     }
//

//
//     private resetChoreSelection() {
//         this.selectedChore.selected = false;
//         this.selectedChore.calculated = false;
//         this.selectedChore = null;
//     }
//
//     onSubmit() {
//         console.log('Form submitted!');
//     }
// }

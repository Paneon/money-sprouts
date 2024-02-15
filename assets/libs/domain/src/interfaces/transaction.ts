export interface Transaction {
    '@id'?: string;
    id: number;
    title?: string;
    type?: number;
    value?: number;
    applied?: boolean;
    user?: string;
    readonly isPocketMoney?: boolean;
    readonly isExpense?: boolean;
    readonly isEarning?: boolean;
}

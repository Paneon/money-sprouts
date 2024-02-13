export interface Transaction {
    title?: string;
    value?: number;
    applied?: boolean;
    category?: string;
    isPocketMoney?: boolean;
    effectiveOn?: string;
    account?: string;
    appliedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    type?: number;
    isExpense?: boolean;
    isEarning?: boolean;
}

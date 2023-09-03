import { Account } from './account';

export interface User {
    readonly id: number;
    email?: string;
    name: string;
    roles: string[];
    password?: string;
    avatar?: string;
    avatarUrl?: string;
    accounts: Account[];
    balance: number;
    readonly userIdentifier?: string;
}

import { Avatar } from './avatar';

export interface Account {
    id: number;
    user: string;
    name: string;
    avatar?: Avatar;
    balance: number;
    allowance: number;
    firstPayday?: Date;
    nextPayday?: Date;
}

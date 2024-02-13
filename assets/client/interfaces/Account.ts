import { Avatar } from '@/client/interfaces/Avatar';

export interface Account {
    id: number;
    user?: string;
    name?: string;
    avatar?: Avatar;
    balance?: number;
    allowance?: number;
    firstPayday?: string;
    nextPayday?: string;
}

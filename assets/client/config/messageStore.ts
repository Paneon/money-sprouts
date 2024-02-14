import { create } from 'zustand';
import { MessageType } from '../interfaces/Message';

interface MessageStoreState {
    message: string | null;
    type: MessageType;
    icon: string | null;
    errorMessage: (m: string) => void;
    successMessage: (m: string, icon?: string) => void;
}
export const useMessageStore = create<MessageStoreState>((set) => ({
    message: null,
    icon: null,
    type: 'none',
    errorMessage: (message: string) =>
        set({
            message,
            type: 'error',
            icon: '⚠',
        }),
    successMessage: (message: string, icon: string = '✔') =>
        set({
            message,
            type: 'success',
            icon,
        }),
}));

import { ErrorMessage, Message } from '@/client/interfaces/Message';

export function createSuccessMessage(message: string, icon = '✔'): Message {
    return {
        message,
        icon,
        type: 'success',
    };
}

export function createInfoMessage(message: string, icon = 'ℹ'): Message {
    return {
        message,
        icon,
        type: 'info',
    };
}

export function createErrorMessage(message: string, icon = '⚠'): ErrorMessage {
    return {
        message,
        icon,
        type: 'error',
    };
}

export function createEmptyMessage(): Message {
    return {
        message: '',
        icon: '',
        type: 'none',
    };
}

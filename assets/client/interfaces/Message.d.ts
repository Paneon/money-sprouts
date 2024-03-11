export type MessageType = 'success' | 'error' | 'info' | 'none';
export interface Message {
    message: string;
    icon?: string;
    type: MessageType;
}

export interface ErrorMessage extends Message {
    type: 'error';
}

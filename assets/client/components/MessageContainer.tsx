import './MessageContainer.scss';
import MessageWithIcon from '@/client/components/MessageWithIcon';
import { MessageType } from '@/client/interfaces/Message';

interface Props {
  icon?: string;
  message: string;
  type: MessageType;
}

export default function MessageContainer({ icon, message, type }: Props) {
  return (
    <>
      {type === 'success' && <MessageWithIcon icon={icon} message={message} />}
      {type === 'error' && (
        <MessageWithIcon icon={icon} message={message} modifier="error" />
      )}
    </>
  );
}

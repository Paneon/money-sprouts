import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface Props {
  icon?: string | null;
  message: string | null;
  modifier?: string;
}

export default function MessageWithIcon({ icon, message, modifier }: Props) {
  const { t, i18n } = useTranslation();

  if (!message) {
    return null;
  }

  return (
    <div className={clsx({ message: true })}>
      {icon && <span className="message-icon">{icon}</span>}
      {t(message!)}
    </div>
  );
}

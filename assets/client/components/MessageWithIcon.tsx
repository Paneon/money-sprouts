import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface Props {
  icon?: string | null;
  message: string | null;
  modifier?: string;
}

export default function MessageWithIcon({ icon, message, modifier }: Props) {
  const { t } = useTranslation();

  if (!message) {
    return null;
  }

  const classes = modifier ? { ['message--' + modifier]: true } : {};

  return (
    <div className={'message ' + clsx(classes)}>
      {icon && <span className="message__icon">{icon}</span>}
      {t(message!)}
    </div>
  );
}

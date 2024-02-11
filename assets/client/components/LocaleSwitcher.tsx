import { useTranslation } from 'react-i18next';
import { Locale } from '@/client/types/Locale';

interface FlagImageProps {
  src: string;
  alt: string;
  label: string;
  targetLocale: Locale;
}

function FlagImage({ src, alt, label, targetLocale }: FlagImageProps) {
  const { i18n } = useTranslation();

  return (
    <img
      src={src}
      alt={alt}
      title={label}
      className="flag-icon cursor-help"
      onClick={() => i18n.changeLanguage(targetLocale)}
    />
  );
}

export default function LocaleSwitcher() {
  const { t, i18n } = useTranslation();

  const label = t('PAGE_HEADER.BUTTONS.MULTILANGUAGE');
  const languageIsDE = i18n.language === Locale.DE;

  return (
    <div className="form-group">
      {languageIsDE ? (
        <FlagImage
          src="/assets/images/usa-flag.png"
          label={label}
          alt="English Flag"
          targetLocale={Locale.EN}
        />
      ) : (
        <FlagImage
          src="/assets/images/germany-flag.png"
          label={label}
          alt="German Flag"
          targetLocale={Locale.DE}
        />
      )}
    </div>
  );
}

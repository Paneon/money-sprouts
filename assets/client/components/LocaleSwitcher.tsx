import { useTranslation } from 'react-i18next';
import { Locale } from '@/client/types/Locale';

export default function LocaleSwitcher() {
  const { t, i18n } = useTranslation();
  function switchLocale(nextLocale: string) {
    i18n.changeLanguage(nextLocale);
  }

  const label = t('PAGE_HEADER.BUTTONS.MULTILANGUAGE');
  const languageIsDE = i18n.language === Locale.DE;

  return (
    <div className="form-group">
      {languageIsDE ? (
        <img
          src="/assets/images/usa-flag.png"
          alt="English Flag"
          title={label}
          className="flag-icon cursor-help"
          onClick={() => {
            switchLocale(Locale.EN);
          }}
        />
      ) : (
        <img
          src="/assets/images/germany-flag.png"
          alt="German Flag"
          title={label}
          className="flag-icon cursor-help"
          onClick={() => {
            switchLocale(Locale.DE);
          }}
        />
      )}
    </div>
  );
}

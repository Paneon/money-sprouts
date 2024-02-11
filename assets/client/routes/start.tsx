import { useTranslation } from 'react-i18next';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <div className="custom-container no-transparency">
      <div className="custom-text-box">
        <h1 className="text-center my-2">{t('HOME.TITLE')}</h1>
        <p className="text-center my-2">{t('HOME.DESCRIPTION')}</p>
        <a href="/login" className="button" title="Login">
          {t('HOME.BUTTON')}
        </a>
      </div>
    </div>
  );
}

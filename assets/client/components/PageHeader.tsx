import LocaleSwitcher from '@/client/components/LocaleSwitcher';
import './PageHeader.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  title?: string;
  isLoggedIn: boolean;
  backButtonTarget?: string;
}

export default function PageHeader({
  title,
  isLoggedIn,
  backButtonTarget,
}: Props) {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            {backButtonTarget ? (
              <a
                href={backButtonTarget}
                className="btn btn-link"
                title={t('PAGE_HEADER.BUTTONS.GO_TO_ACCOUNT_SELECTION')}
              >
                <img
                  src="/assets/images/go-back-arrow_small.png"
                  width={50}
                  height={50}
                  alt="Go back arrow"
                />
              </a>
            ) : (
              <div className="pseudo-element" />
            )}
          </div>

          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <div className="page-title navbar-text">{title}</div>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center">
            <div>
              <LocaleSwitcher />
            </div>
            {isLoggedIn && (
              <a href="/logout" title={t('PAGE_HEADER.BUTTONS.LOGOUT')}>
                <img
                  src="/assets/images/logout-round-grey_small.png"
                  alt="logout button"
                  width={50}
                  height={50}
                  className="image-50x50"
                />
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

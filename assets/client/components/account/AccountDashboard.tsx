import { useTranslation } from 'react-i18next';
import AccountLayout from '@/client/layouts/AccountLayout';
import { useNavigate, useParams } from 'react-router-dom';
import './AccountDashboard.scss';
import { pathToRoute } from '@/client/utils/pathToRoute';

interface Section {
  name: string;
  image: string;
  url: string;
}

interface Props {
  sections: Section[];
}

/**
 * This page shows the details of an account and is the entry point for any account holder
 * - Does not show a logout or back button
 */
function AccountDashboardView({ sections }: Props) {
  return (
    <div className="custom-container no-transparency">
      <div className="button-container">
        {sections.map((section, index) => (
          <div key={index}>
            <a href={section.url} className="image-text-button">
              <img src={section.image} />
              <label>{section.name}</label>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AccountDashboard() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sections: Section[] = [
    {
      name: t('DASHBOARD.SECTION_NAME.OVERVIEW'),
      image: './assets/images/overview.png',
      url: pathToRoute('accounts_balance', { id }),
    },
    {
      name: t('DASHBOARD.SECTION_NAME.HISTORY'),
      image: './assets/images/history.png',
      url: pathToRoute('accounts_history', { id }),
    },
    {
      name: t('DASHBOARD.SECTION_NAME.PLAN'),
      image: './assets/images/plan.png',
      url: pathToRoute('accounts_plan', { id }),
    },
  ];

  if (!id) {
    navigate(pathToRoute('dashboard'));
    return;
  }

  return (
    <AccountLayout
      title={t('PAGE_HEADER.PAGE_NAME.DASHBOARD')}
      backTo={pathToRoute('dashboard')}
    >
      <AccountDashboardView sections={sections} />
    </AccountLayout>
  );
}

import PageHeader from '@/client/components/PageHeader';
import { useTranslation } from 'react-i18next';

export default function AccountSelectionPage() {
  const { t } = useTranslation();

  const memberAccounts = [];

  return (
    <>
      <PageHeader
        isLoggedIn={true}
        title={t('PAGE_HEADER.PAGE_NAME.ACCOUNT-SELECTION')}
      />
      <div id="account-selection" class="custom-container no-transparency">
        <div class="button-container">
          {memberAccounts.length > 0 &&
            memberAccounts.map((member: Member, index) => {
              if (!member.name) return null;
              return <MemberTile key={index} member={member} />;
            })}
        </div>
      </div>
    </>
  );
}

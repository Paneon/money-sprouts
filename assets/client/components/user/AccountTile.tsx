import { Account } from '@/client/interfaces/Account';
import './AccountTile.scss';

interface Props {
  account: Account;
}

export default function AccountTile({ account }: Props) {
  if (!account || !account.avatar) {
    return null;
  }

  return (
    <a className="account-tile" href={`/accounts/${account.id}/`}>
      <img src={account.avatar.url} width={100} height={100} alt="Avatar" />
      <label className="label pt-4">{account.name}</label>
    </a>
  );
}

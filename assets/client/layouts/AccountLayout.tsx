import PageHeader from '@/client/components/PageHeader';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
  backTo?: string;
}
export default function AccountLayout({ title, backTo, children }: Props) {
  return (
    <>
      <PageHeader showLogout={false} title={title} backButtonTarget={backTo} />
      {children}
    </>
  );
}

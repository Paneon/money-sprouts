import PageHeader from '@/client/components/PageHeader';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
}
export default function AccountLayout({ title, children }: Props) {
  return (
    <>
      <PageHeader showLogout={false} title={title} />
      {children}
    </>
  );
}

import PageHeader from '@/client/components/PageHeader';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
}
export default function UserLayout({ title, children }: Props) {
  return (
    <>
      <PageHeader isLoggedIn={true} title={title} />
      {children}
    </>
  );
}

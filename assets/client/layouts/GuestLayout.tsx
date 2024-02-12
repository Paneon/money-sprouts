import React, { PropsWithChildren } from 'react';
import LocaleSwitcher from '@/client/components/LocaleSwitcher';

interface Props extends PropsWithChildren {
  title?: string;
}
export default function GuestLayout({ title, children }: Props) {
  return (
    <>
      <LocaleSwitcher />
      {children}
    </>
  );
}

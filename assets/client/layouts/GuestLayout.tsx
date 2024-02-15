import React, { PropsWithChildren } from 'react';
import LocaleSwitcher from '@/client/components/LocaleSwitcher';

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LocaleSwitcher />
      {children}
    </>
  );
}

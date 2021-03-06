import React, { ReactChildren, ReactElement } from 'react';
import Head from 'next/head';

import Header from '@parts/Header';
interface Props {
  children?: any;
}

export default function DefaultLayout({ children }: Props): ReactElement {
  return (
    <>
      <Head>
        <title>OpenPond | Schelling Point Hackathon</title>
        <link rel="shortcut icon" href="/images/fluence.png" />
      </Head>
      <Header />
      {children}
    </>
  );
}

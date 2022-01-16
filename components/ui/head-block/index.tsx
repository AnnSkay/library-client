import React from 'react';
import Head from 'next/head';

export function HeadBlock({title}: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

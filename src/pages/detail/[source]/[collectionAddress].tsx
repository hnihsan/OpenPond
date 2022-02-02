import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout/Default';
type Props = {};

export default function Detail({}: Props) {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <section className="my-10 my-collections">
        <div className="container">
          <div className="header-title flex justify-between">
            <h1 className="font-bold text-3xl">My Collections</h1>
          </div>
        </div>
      </section>
    </Layout>
  );
}

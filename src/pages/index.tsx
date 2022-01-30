import type { NextPage } from 'next';
import Layout from '@components/Layout/Default';
import Explore from '@parts/Explore/index';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <section className="my-10">
          <Explore />
        </section>
      </Layout>
    </>
  );
};

export default Home;

import type { NextPage } from 'next';
import Layout from '@components/Layout/Default';
import Explore from '@parts/Explore/index';
// Fluence test
import { Fluence, setLogLevel, FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, Node } from '@fluencelabs/fluence-network-environment';
import OpenSeaApi from '../services/opensea_api';
import RaribleApi from '../services/rarible_api';

const Home: NextPage = ({ openseaNfts, raribleNfts }) => {
  return (
    <>
      <Layout>
        <section className="my-10">
          <Explore openseaNfts={openseaNfts} raribleNfts={raribleNfts} />
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  await Fluence.start({ connectTo: krasnodar[0] });
  console.log(
    'created a Fluence client %s with relay %s',
    Fluence.getStatus().peerId,
    Fluence.getStatus().relayPeerId,
  );
  const opensea_all_assets = await OpenSeaApi.getAllAssets();
  const rarible_all_assets = await RaribleApi.getAllAssets();

  return {
    props: {
      openseaNfts: opensea_all_assets,
      raribleNfts: rarible_all_assets,
    },
  };
}

export default Home;

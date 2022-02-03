import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout/Default';

// Fluence test
import { Fluence, setLogLevel, FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, Node } from '@fluencelabs/fluence-network-environment';
import OpenSeaApi from '@services/opensea_api';
import RaribleApi from '@services/rarible_api';
import OpenseaDetail from '@parts/Detail/Opensea/OpenseaDetail';

import { useUser } from '@data/useUser';

type Props = {};

export default function Detail({}: Props) {
  useUser({});
  const router = useRouter();
  const { source = null, contract = null } = router.query;

  // opensea
  const [openseaAssets, setOpenseaAssets] = useState([]);
  const [isLoadingOpenseaAssets, setIsLoadingOpenseaAssets] = useState(false);

  const loadOpenseaCollectionDetail = async () => {
    try {
      setIsLoadingOpenseaAssets(true);
      await Fluence.start({ connectTo: krasnodar[0] });
      const newAssets = await OpenSeaApi.getOwnedAssetsByCollection({
        collection_addr: contract,
      });

      setOpenseaAssets(newAssets);
      setIsLoadingOpenseaAssets(false);
    } catch (error) {
      setIsLoadingOpenseaAssets(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadOpenseaCollectionDetail();
    };
    init();
  }, []);

  return (
    <Layout>
      <section className="my-10 my-collections">
        <div className="container">
          <div className="header-title flex justify-between">
            <h1 className="font-bold text-3xl">Assets by Collection</h1>
          </div>

          {source === 'opensea' && (
            <OpenseaDetail
              isLoading={isLoadingOpenseaAssets}
              assets={openseaAssets}
            />
          )}

          {source === 'rarible' && 'rarible'}
        </div>
      </section>
    </Layout>
  );
}

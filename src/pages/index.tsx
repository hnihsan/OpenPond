import type { NextPage } from 'next';
import Layout from '@components/Layout/Default';
import { useEffect, useState } from 'react';

// Fluence test
import { Fluence, setLogLevel, FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, Node } from '@fluencelabs/fluence-network-environment';
import OpenSeaApi from '@services/opensea_api';
import RaribleApi from '@services/rarible_api';

import RaribleExplore from '@parts/Explore/rarible/RaribleExplore';
import OpenseaExplore from '@parts/Explore/opensea/OpenseaExplore';

const Home: NextPage = () => {
  const [source, setSource] = useState('OPENSEA');

  // Opensea
  const [openseaAssets, setOpenseaAssets] = useState([]);
  const [isLoadingOpensea, setIsLoadingOpensea] = useState(false);
  const [offsetOpensea, setOffsetOpensea] = useState(0);

  // Rarible
  const [raribleAssets, setRaribleAssets] = useState([]);
  const [isLoadingRarible, setIsLoadingRarible] = useState(false);
  const [continuation, setContinuation] = useState('');

  const loadMoreOpensea = async () => {
    try {
      setIsLoadingOpensea(true);

      await Fluence.start({ connectTo: krasnodar[0] });
      const newAssets = await OpenSeaApi.getAllAssets({
        offset: offsetOpensea,
        limit: 20,
        order: 'asc',
      });
      setOpenseaAssets([...openseaAssets, ...newAssets]);

      setOffsetOpensea(offsetOpensea + 1);
      setIsLoadingOpensea(false);
    } catch (error) {
      setIsLoadingOpensea(false);
      console.error(error);
    }
  };

  const loadMoreRarible = async () => {
    try {
      setIsLoadingRarible(true);

      await Fluence.start({ connectTo: krasnodar[0] });
      const response = await RaribleApi.getAllAssets({
        size: 20,
        continue_token: continuation,
      });
      setContinuation(response.continuation);
      setRaribleAssets([...raribleAssets, ...response.items]);

      setIsLoadingRarible(false);
    } catch (error) {
      setIsLoadingRarible(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadMoreOpensea();
      await loadMoreRarible();
    };
    init();
  }, []);

  return (
    <>
      <Layout>
        <section className="my-10">
          <div className="container">
            <div className="header-title flex justify-between">
              <h1 className="font-bold text-3xl">Explore</h1>
            </div>

            <div className="mt-4 rounded">
              <ul id="tabs" className="inline-flex w-full">
                <li
                  className={`font-semibold text-gray-800 border-b-2 rounded-t ${
                    source === 'OPENSEA' ? 'border-blue-500' : ''
                  }`}
                >
                  <button
                    className="px-4 py-2"
                    onClick={() => {
                      setSource('OPENSEA');
                    }}
                  >
                    OpenSea
                  </button>
                </li>
                <li
                  className={`font-semibold text-gray-800 border-b-2 rounded-t ${
                    source === 'RARIBLE' ? 'border-blue-500' : ''
                  }`}
                >
                  <button
                    className="px-4 py-2"
                    onClick={() => {
                      setSource('RARIBLE');
                    }}
                  >
                    Rarible
                  </button>
                </li>
              </ul>
            </div>

            {/* opensea content */}
            {source === 'OPENSEA' && (
              <OpenseaExplore
                onLoadMore={loadMoreOpensea}
                isLoading={isLoadingOpensea}
                assets={openseaAssets}
              />
            )}
            {source === 'RARIBLE' && (
              <RaribleExplore
                onLoadMore={loadMoreRarible}
                isLoading={isLoadingRarible}
                assets={raribleAssets}
              />
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;

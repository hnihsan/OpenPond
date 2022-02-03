import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import Layout from '@components/Layout/Default';
import OpenSeaCollectionItem from '@parts/MyCollections/opensea';

import RaribleCollections from '@parts/MyCollections/rarible';

// Fluence test
import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import OpenSeaApi from '@services/opensea_api';
import RaribleApi from '@services/rarible_api';

const MyCollections: NextPage = () => {
  const { account } = useWeb3React();

  const [source, setSource] = useState('OPENSEA');

  // opensea
  const [isLoadingOpenseaCollection, setIsLoadingOpenseaCollection] =
    useState(false);
  const [openseaCollections, setOpenseaCollections] = useState([]);

  // rarible
  const [isLoadingRaribleCollection, setIsLoadingRaribleCollection] =
    useState(false);
  const [raribleCollections, setRaribleCollections] = useState([]);

  const loadOpenseaCollection = async () => {
    try {
      setIsLoadingOpenseaCollection(true);

      await Fluence.start({ connectTo: krasnodar[0] });
      const collections = await OpenSeaApi.getOwnedCollections({
        owner_address: account,
      });

      setOpenseaCollections(collections);
      setIsLoadingOpenseaCollection(false);
    } catch (error) {
      setIsLoadingOpenseaCollection(false);
      console.error(error);
    }
  };

  const loadRaribleCollection = async () => {
    try {
      setIsLoadingRaribleCollection(true);

      await Fluence.start({ connectTo: krasnodar[0] });
      const collections = await RaribleApi.getOwnedCollections({
        owner_address: account,
      });

      setRaribleCollections(collections);
      setIsLoadingRaribleCollection(false);
    } catch (error) {
      setIsLoadingRaribleCollection(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadOpenseaCollection();
      await loadRaribleCollection();
    };

    if (account) {
      console.log(account);
      init();
    }
  }, [account]);

  return (
    <>
      <Layout>
        <section className="my-10">
          <div className="container">
            <div className="header-title flex justify-between">
              <h1 className="font-bold text-3xl">My Collections</h1>
            </div>

            <div className="flex mt-4 -mx-4 flex-col md:flex-row">
              <div className="md:w-1/12 px-4">
                <div className="rounded sticky top-16">
                  <ul
                    id="tabs"
                    className="w-full flex flex-row md:flex-col justify-around"
                  >
                    <li className={`text-gray-800 rounded-t`}>
                      <button
                        className={`py-2 w-full ${
                          source === 'OPENSEA' ? 'font-bold' : ''
                        }`}
                        onClick={() => {
                          setSource('OPENSEA');
                        }}
                      >
                        OpenSea
                      </button>
                    </li>
                    <li className={`text-gray-800 rounded-t`}>
                      <button
                        className={`py-2 w-full ${
                          source === 'RARIBLE' ? 'font-bold' : ''
                        }`}
                        onClick={() => {
                          setSource('RARIBLE');
                        }}
                      >
                        Rarible
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:w-11/12 px-4 border-l border-black">
                {/* Content Tab */}
                {source === 'OPENSEA' && (
                  <OpenSeaCollectionItem
                    collections={openseaCollections}
                    isLoading={isLoadingOpenseaCollection}
                  />
                )}
                {source === 'RARIBLE' && (
                  <RaribleCollections
                    collections={raribleCollections}
                    isLoading={isLoadingRaribleCollection}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MyCollections;

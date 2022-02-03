import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import Layout from '@components/Layout/Default';
import { useUser } from '@data/useUser';
import OpenSeaCollectionItem from '@parts/MyAssets/opensea/collections';
import OpenSeaOwnedItem from '@parts/MyAssets/opensea/owned';
import RaribleCollectionItem from '@parts/MyAssets/rarible/collections';
import RaribleOwnedItem from '@parts/MyAssets/rarible/owned';

// Fluence test
import { Fluence, setLogLevel, FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, Node } from '@fluencelabs/fluence-network-environment';
import OpenSeaApi from '@services/opensea_api';
import RaribleApi from '@services/rarible_api';

const MyCollections: NextPage = () => {
  const { account } = useWeb3React();

  const { user, loading, mutate } = useUser({});

  const [source, setSource] = useState('OPENSEA');
  const [currentTab, setCurrentTab] = useState('MY_COLLECTIONS');

  // opensea
  const [isLoadingOpenseaCollection, setIsLoadingOpenseaCollection] =
    useState(false);
  const [openseaCollections, setOpenseaCollections] = useState([]);

  // rarible
  const [isLoadingRaribleCollection, setIsLoadingRaribleCollection] =
    useState(false);

  const loadMoreOpenseaCollection = async () => {
    try {
      setIsLoadingOpenseaCollection(true);

      await Fluence.start({ connectTo: krasnodar[0] });
      const newCollections = await OpenSeaApi.getOwnedCollections({
        owner_address: user?.address,
      });

      setOpenseaCollections(newCollections);
      console.log(openseaCollections);
      setIsLoadingOpenseaCollection(false);
    } catch (error) {
      setIsLoadingOpenseaCollection(false);
      console.error(error);
    }
  };

  const loadMoreRaribleCollection = async () => {
    try {
      setIsLoadingRaribleCollection(true);

      await Fluence.start({ connectTo: krasnodar[0] });
      const response = await RaribleApi.getOwnedCollections({
        owner_address: user?.address,
        // owner_address: '0xcf2Cf040D7A03fF563e65f0bA73686aCb00f9811',
      });
      console.log('rarible');
      console.log(response);
    } catch (error) {
      setIsLoadingRaribleCollection(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadMoreOpenseaCollection();
      await loadMoreRaribleCollection();
    };

    if (!loading) {
      if (account) {
        console.log(account);
        init();
      }
    }
  }, [account]);

  return (
    <>
      <Layout>
        <section className="my-10">
          <div className="container">
            <div className="header-title flex justify-between">
              <h1 className="font-bold text-3xl">My Assets</h1>
            </div>

            <div className="flex mt-4 -mx-4">
              <div className="w-1/12 px-4">
                <div className="rounded sticky top-16">
                  <ul id="tabs" className="w-full">
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

              <div className="w-11/12 px-4 border-l border-black">
                {/* Tabs */}
                <ul id="tabs" className="inline-flex w-full">
                  <li
                    className={`font-semibold text-gray-800 border-b-2 rounded-t ${
                      currentTab === 'MY_COLLECTIONS' ? 'border-blue-500' : ''
                    }`}
                  >
                    <button
                      className="px-4 py-2"
                      onClick={() => {
                        setCurrentTab('MY_COLLECTIONS');
                      }}
                    >
                      My Collections
                    </button>
                  </li>
                  <li
                    className={`font-semibold text-gray-800 border-b-2 rounded-t ${
                      currentTab === 'OWNED' ? 'border-blue-500' : ''
                    }`}
                  >
                    <button
                      className="px-4 py-2"
                      onClick={() => {
                        setCurrentTab('OWNED');
                      }}
                    >
                      Owned
                    </button>
                  </li>
                </ul>

                {/* Content Tab */}
                {source === 'OPENSEA' && currentTab === 'MY_COLLECTIONS' && (
                  <OpenSeaCollectionItem
                    collections={openseaCollections}
                    isLoading={isLoadingOpenseaCollection}
                    onLoadMore={loadMoreOpenseaCollection}
                  />
                )}
                {source === 'OPENSEA' && currentTab === 'OWNED' && (
                  <OpenSeaOwnedItem />
                )}
                {source === 'RARIBLE' && currentTab === 'MY_COLLECTIONS' && (
                  <RaribleCollectionItem />
                )}
                {source === 'RARIBLE' && currentTab === 'OWNED' && (
                  <RaribleOwnedItem />
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

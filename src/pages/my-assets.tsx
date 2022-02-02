import type { NextPage } from 'next';
import Layout from '@components/Layout/Default';
import { useEffect, useState } from 'react';
import FakeNfts from '@data/fake-nfts.json';
import OpenSeaCollectionItem from '@parts/MyAssets/opensea/collections';
import OpenSeaOwnedItem from '@parts/MyAssets/opensea/owned';
import RaribleCollectionItem from '@parts/MyAssets/rarible/collections';
import RaribleOwnedItem from '@parts/MyAssets/rarible/owned';

const MyCollections: NextPage = () => {
  const [source, setSource] = useState('OPENSEA');
  const [currentTab, setCurrentTab] = useState('MY_COLLECTIONS');
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setNfts(FakeNfts.assets);
      setIsLoading(false);
    }, 1000);
  }, []);

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
                  <OpenSeaCollectionItem />
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

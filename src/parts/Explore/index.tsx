import React, { useEffect, useState } from 'react';

import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';

import RaribleExploreItem from './RaribleExploreItem';
import axios from 'axios';
import OpenSeaItem from './OpenSeaItem';
import RaribleItem from './RaribleItem';
import FakeNfts from '@data/fake-nfts.json';

// Fluence test
import { Fluence, setLogLevel, FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, Node } from '@fluencelabs/fluence-network-environment';
import OpenSeaApi from '@services/opensea_api';
import RaribleApi from '@services/rarible_api';

interface Props {
  classname?: string | null;
}

export default function Explore({ classname }: Props) {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState('OPENSEA');
  const [offsetOpensea, setOffsetOpensea] = useState(0);

  // rarible
  const [continuation, setContinuation] = useState('');
  const [nftsRarible, setNftsRarible] = useState([]);
  const [isLoadingRarible, setIsLoadingRarible] = useState(false);

  const loadMore = async () => {
    try {
      // setIsLoading(true);
      // const response: any = await axios.get(
      //   `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=${offsetOpensea}&limit=25`
      // );
      // const newNFTs = response.data?.assets;
      // setOffsetOpensea(offsetOpensea + 1);
      // setNfts([...nfts, ...newNFTs]);

      // console.log(nfts);

      setIsLoading(true);
      console.log(krasnodar[0]);
      await Fluence.start({ connectTo: krasnodar[0] });
      console.log(
        'created a Fluence client %s with relay %s',
        Fluence.getStatus().peerId,
        Fluence.getStatus().relayPeerId
      );
      const newAssets = await OpenSeaApi.getAllAssets();
      console.log(newAssets);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const loadMoreRarible = async () => {
    try {
      setIsLoadingRarible(true);
      const response: any = await axios.get(
        `https://ethereum-api.rarible.org/v0.1/nft/items/all?size=20&continuation=${continuation}`
      );
      const raribleResponse = response.data;
      const newNfts = raribleResponse.items;
      setContinuation(raribleResponse.continuation);
      setNftsRarible([...nftsRarible, ...newNfts]);
      console.log(newNfts);
      console.log(nftsRarible);

      setIsLoadingRarible(false);
    } catch (error) {
      setIsLoadingRarible(false);
      console.error(error);
    }
  };

  useEffect(() => {
    loadMore();
    // loadMoreRarible();
  }, []);

  return (
    <section className={['discovery-item', classname].join(' ')}>
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
        <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6 -mx-5">
          {source === 'OPENSEA' &&
            [].map((nft, i) => {
              return <OpenSeaItem nft={nft} key={i} />;
            })}

          {source === 'OPENSEA' && isLoading && (
            <>
              <div className="px-5">
                <TrendingCardSkeleton />
              </div>
              <div className="px-5">
                <TrendingCardSkeleton />
              </div>
              <div className="px-5">
                <TrendingCardSkeleton />
              </div>
              <div className="px-5">
                <TrendingCardSkeleton />
              </div>
            </>
          )}
        </div>
        {source === 'OPENSEA' && !isLoading && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
            >
              Load More
            </button>
          </div>
        )}

        {source === 'RARIBLE' &&
          [].map((nft, i) => (
            <div className="rarible_item" key={i}>
              <RaribleItem nft={nft} />
            </div>
          ))}

        {source === 'RARIBLE' && isLoading && (
          <>
            <div className="px-5">
              <TrendingCardSkeleton />
            </div>
            <div className="px-5">
              <TrendingCardSkeleton />
            </div>
            <div className="px-5">
              <TrendingCardSkeleton />
            </div>
            <div className="px-5">
              <TrendingCardSkeleton />
            </div>
          </>
        )}

        {source === 'RARIBLE' && !isLoadingRarible && (
          <div className="flex justify-center">
            <button
              onClick={loadMoreRarible}
              className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

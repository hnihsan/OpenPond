import React, { useEffect, useState } from 'react';

import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import ExploreItem from './ExploreItem';
import FakeNfts from '@data/fake-nfts.json';
import axios from 'axios';
interface Props {
  classname?: string | null;
}

export default function Explore({ classname }: Props) {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [source, setSource] = useState('OPENSEA');
  const [offsetOpensea, setOffsetOpensea] = useState(0);

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const response: any = await axios.get(
        `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=${offsetOpensea}&limit=50`,
      );
      const newNFTs = response.data?.assets;
      setOffsetOpensea(offsetOpensea + 1);
      setNfts([...nfts, ...newNFTs]);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMore();
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

        <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6 -mx-5">
          {source === 'OPENSEA' &&
            nfts.map((nft, i) => {
              return <ExploreItem nft={nft} key={i} />;
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
        {!isLoading && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
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

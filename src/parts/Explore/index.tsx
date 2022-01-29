import React, { useEffect, useState } from 'react';

import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import ExploreItem from './ExploreItem';
import FakeNfts from '@data/fake-nfts.json';
interface Props {
  classname?: string | null;
}

export default function Explore({ classname }: Props) {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [source, setSource] = useState('OPENSEA');

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      const { assets } = FakeNfts;
      setNfts(assets);
      setIsLoading(false);
    }, 3000);
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

          {source === 'OPENSEA' &&
            nfts.map((nft, i) => (
              <div className="test" key={i}>
                <ExploreItem nft={nft} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

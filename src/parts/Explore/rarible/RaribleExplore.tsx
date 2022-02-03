import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import React from 'react';
import RaribleItem from './RaribleItem';

type Props = {
  assets: any[];
  isLoading: boolean;
  onLoadMore: () => void;
};

export default function RaribleExplore({
  assets,
  isLoading,
  onLoadMore,
}: Props) {
  return (
    <>
      {assets.length === 0 && !isLoading && (
        <h3 className="mt-10">No assets to display</h3>
      )}
      <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6 -mx-5">
        {assets.map((nft, i) => {
          return <RaribleItem nft={nft} key={i} />;
        })}

        {isLoading && (
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

      {!isLoading && assets.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

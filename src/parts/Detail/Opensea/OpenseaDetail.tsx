import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import OpenSeaItem from '@parts/Explore/opensea/OpenseaItem';
import React from 'react';

type Props = {
  assets: any[];
  isLoading: boolean;
};

export default function OpenseaDetail({ assets, isLoading }: Props) {
  return (
    <>
      {assets.length === 0 && !isLoading && (
        <h3 className="mt-10">No assets to display</h3>
      )}
      <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6 -mx-5">
        {assets.map((nft, i) => {
          return <OpenSeaItem nft={nft} key={i} />;
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
    </>
  );
}

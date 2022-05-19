import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import { useUser } from '@data/useUser';

import RaribleItem from '@parts/Explore/rarible/RaribleItem';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  assets: any[];
  isLoading: boolean;
};

export default function RaribleDetail({ assets, isLoading }: Props) {
  const router = useRouter();
  const { user, mutate } = useUser({});

  useEffect(() => {
    if (!user?.isLoggedIn) {
      console.log('yers here');
      router.push('/');
    } else {
      console.log('masuk sini');
    }
    console.log(user);
  }, [user]);

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
    </>
  );
}

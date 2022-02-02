import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import { useUser } from '@data/useUser';
import CollectionItem from '@parts/MyAssets/opensea/collections/CollectionItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Index({}) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading, mutate } = useUser({});

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const response: any = await axios.get(
        `https://testnets-api.opensea.io/api/v1/collections?asset_owner=0xcf2Cf040D7A03fF563e65f0bA73686aCb00f9811&offset=0&limit=50`,
      );
      // const response: any = await axios.get(
      //   `https://testnets-api.opensea.io/api/v1/collections?asset_owner=${user?.address}&offset=0&limit=50`,
      // );
      const newCollections = response.data;
      console.log(newCollections);
      setCollections([...collections, ...newCollections]);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user?.address) {
        loadMore();
      }
    }
  }, [user, loading]);

  return (
    <>
      <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6">
        {collections ??
          [].map((nft, i) => {
            return <CollectionItem nft={nft} key={i} />;
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
      {!isLoading && collections.length > 20 && (
        <div className="flex justify-center">
          <button className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded">
            Load More
          </button>
        </div>
      )}
    </>
  );
}

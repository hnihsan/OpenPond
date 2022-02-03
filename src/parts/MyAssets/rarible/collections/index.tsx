import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import RaribleCollectionItem from './CollectionItem';

type Props = {
  collections: any[];
  isLoading: boolean;
  onLoadMore: () => void;
};
export default function RaribleCollections({
  collections,
  isLoading,
  onLoadMore,
}: Props) {
  return (
    <>
      <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6">
        {collections.map((collection, i) => {
          return <RaribleCollectionItem collection={collection} key={i} />;
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
          <button
            className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
            onClick={onLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

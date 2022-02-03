import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import RaribleCollectionItem from './CollectionItem';

type Props = {
  collections: any[];
  isLoading: boolean;
};
export default function RaribleCollections({ collections, isLoading }: Props) {
  return (
    <>
      {collections.length === 0 && !isLoading && (
        <h3 className="mt-10">No collections to display</h3>
      )}
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
    </>
  );
}

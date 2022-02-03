import TrendingCardSkeleton from '@components/Skeleton/TrendingCardSkeleton';
import CollectionItem from '@parts/MyAssets/opensea/collections/CollectionItem';

type Props = {
  collections: any[];
  isLoading: boolean;
};
export default function Index({ collections, isLoading }: Props) {
  return (
    <>
      <div className="content-body grid grid-cols-1 md:grid-cols-4 mt-6">
        {collections.map((collection, i) => {
          return <CollectionItem collection={collection} key={i} />;
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

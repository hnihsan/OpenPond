import React from 'react';
import Img from '@components/Img';
export default function ExploreItem({ nft }: any) {
  return (
    <div className="item relative p-5">
      <figure>
        <Img
          className="rounded-xl w-full"
          src={`/api/imageproxy?url=${encodeURIComponent(
            nft?.meta?.image
              ? nft?.meta?.image?.url?.ORIGINAL
              : nft?.meta?.animation
              ? nft?.meta?.animation?.url?.ORIGINAL
              : 'https://fakeimg.pl/640x360',
          )}`}
          alt="trending-icon"
          width="100%"
          height="100%"
        />

        <figcaption>
          <div className="creator-wrapper flex justify-between">
            <div className="flex items-center mt-3">
              <div className="avatar-wrapper relative">
                <img
                  className="max-w-full rounded-full"
                  src="https://storage.googleapis.com/opensea-static/opensea-profile/33.png"
                  alt={nft?.creators[0]?.account ?? 'creator'}
                  width={23}
                />
              </div>

              <h3 className="text-sm text-black font-medium ml-2 text-opacity-50 truncate">
                {nft?.creators[0]?.account ?? '<null creator>'}
              </h3>
            </div>
          </div>
          <h3 className="font-semibold mt-3">
            {nft?.meta?.name ?? '<null asset name>'}
          </h3>
        </figcaption>
      </figure>
    </div>
  );
}

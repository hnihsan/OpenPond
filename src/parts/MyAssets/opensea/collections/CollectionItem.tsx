import React from 'react';
import Img from '@components/Img';
import Link from 'next/link';

export default function CollectionItem({ nft }: any) {
  return (
    <div className="item relative p-5">
      <figure>
        <Img
          className="rounded-xl w-full"
          src={`/api/imageproxy?url=${encodeURIComponent(
            nft?.image_url === '' ? 'https://fakeimg.pl/640x360' : nft?.image_url,
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
                  src={nft?.creator?.profile_img_url ?? ''}
                  alt={nft?.creator?.user?.username ?? 'creator'}
                  width={23}
                />
              </div>

              <h3 className="text-sm text-black font-medium ml-2 text-opacity-50 truncate">
                {nft?.creator?.user?.username ?? '<null creator>'}
              </h3>
            </div>
          </div>

          <Link href={'/asdfdsf'}>
            <a className="link-wrapped font-semibold mt-3">
              {nft?.name ?? '<null asset name>'}
            </a>
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}

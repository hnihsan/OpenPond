import React from 'react';
import Img from '@components/Img';
import Link from 'next/link';

export default function RaribleCollectionItem({ collection }: any) {
  return (
    <div className="item relative p-5">
      <figure>
        <Img
          className="rounded-xl w-full"
          src={`/api/imageproxy?url=${encodeURIComponent(
            collection?.meta?.image
              ? collection?.meta?.image?.url?.ORIGINAL
              : collection?.meta?.animation
              ? collection?.meta?.animation?.url?.ORIGINAL
              : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/fluence.png`
          )}`}
          alt={collection?.meta?.name}
          width="100%"
          height="100%"
        />

        <figcaption>
          <div className="creator-wrapper flex justify-center">
            <Link href={`/detail/opensea/${collection?.slug}`}>
              <a className="text-sm text-black font-medium ml-2 text-opacity-50 link-wrapped">
                {collection?.name} - {collection?.symbol}
              </a>
            </Link>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

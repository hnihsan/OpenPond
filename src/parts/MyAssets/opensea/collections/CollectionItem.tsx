import React from 'react';
import Img from '@components/Img';
import Link from 'next/link';

export default function OpenseaCollectionItem({ collection }: any) {
  return (
    <div className="item relative p-5">
      <figure>
        <Img
          className="rounded-xl w-full"
          src={`/api/imageproxy?url=${encodeURIComponent(
            collection?.banner_image_url ||
              collection?.image_url ||
              `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/fluence.png`
          )}`}
          alt="trending-icon"
          width="100%"
          height="100%"
        />

        <figcaption>
          <div className="creator-wrapper flex justify-between">
            <div className="flex items-center mt-3">
              <Link href={`/detail/opensea/${collection?.slug}`}>
                <a className="text-sm text-black font-medium ml-2 text-opacity-50 link-wrapped">
                  {collection?.name}
                </a>
              </Link>
            </div>
            <div className="flex items-center">
              <img
                style={{ width: 18, height: 13 }}
                src="/images/sales.png"
                className="max-w-full"
                width="13px"
                height="13px"
                alt=""
              />
              <p className="text-sm text-black font-medium ml-2 text-opacity-50">
                {collection?.owned_asset_count}
              </p>
            </div>
          </div>

          {/* <h3 className="font-semibold mt-3">
            {collection?.name ?? alternate_collection_name}
          </h3>

          <p className="text-gray-400 text-sm">{collection_name}</p> */}
        </figcaption>
      </figure>
    </div>
  );
}

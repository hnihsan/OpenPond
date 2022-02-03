import React from 'react';
import Img from '@components/Img';

export default function RaribleItem({ nft }: any) {
  const creator_address = nft?.creators?.account;
  const display_address = creator_address
    ? creator_address.substring(0, 12) + '...'
    : 'Creator';
  const creator_name = display_address;

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
              : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/fluence.png`
          )}`}
          alt={nft?.meta?.name}
          width="100%"
          height="100%"
        />

        <figcaption>
          <div className="creator-wrapper flex justify-between">
            <div className="flex items-center mt-3">
              <div className="avatar-wrapper relative">
                <img
                  className="max-w-full rounded-full"
                  src={'/images/default_user.png'}
                  alt={creator_address}
                  width={23}
                />
              </div>

              <h3 className="text-sm text-black font-medium ml-2 text-opacity-50 truncate">
                {creator_name}
              </h3>
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
                {nft?.supply || 0}
              </p>
            </div>
          </div>

          <h3 className="font-semibold mt-3">
            {nft?.meta?.name || 'Rarible Collection #999'}
          </h3>

          <p className="text-gray-400 text-sm">
            {nft?.meta?.description
              ? nft?.meta?.description.substring(0, 250) + '...'
              : 'Rarible Collection #999'}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

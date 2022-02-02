import React from 'react';
import Img from '@components/Img';
export default function OpenSeaItem({ nft }: any) {
  const creator_address = nft?.creator?.address;
  const display_address = creator_address
    ? creator_address.substring(0, 12) + '...'
    : 'Creator';
  const creator_name = nft?.creator?.user?.username || display_address;
  const collection_name =
    nft?.collection?.name || nft?.asset_contract?.name || 'OpenSea Collection';
  const alternate_nft_name = collection_name + '#' + nft.token_id;

  return (
    <div className="item relative p-5">
      <figure>
        <Img
          className="rounded-xl w-full"
          src={
            nft?.image_url ||
            nft?.collection?.large_image_url ||
            '/images/fluence.png'
          }
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
                  src={nft?.creator?.profile_img_url || '/images/default_user.png'}
                  alt={creator_name}
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
                {nft?.num_sales || 0}
              </p>
            </div>
          </div>

          <h3 className="font-semibold mt-3">{nft?.name ?? alternate_nft_name}</h3>

          <p className="text-gray-400 text-sm">{collection_name}</p>
        </figcaption>
      </figure>
    </div>
  );
}

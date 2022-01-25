import React from 'react';
import Link from 'next/link';
import Img from '@components/Img';
export default function ExploreItem({ nft }: any) {
  return (
    <div className="item relative p-5">
      <figure>
        <Img
          className="rounded-xl w-full"
          src={nft.image_preview_url}
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
                  src={nft?.creator?.profile_img_url}
                  alt={nft?.creator?.user?.username ?? 'creator'}
                  width={23}
                />
              </div>

              <h3 className="text-sm text-black font-medium ml-2 text-opacity-50 truncate">
                {nft?.creator?.user?.username ?? 'creator'}
              </h3>
            </div>
            <div className="flex items-center">
              <img
                style={{ width: 18, height: 13 }}
                src="/images/eye.png"
                className="max-w-full"
                width="13px"
                height="13px"
                alt=""
              />
              <p className="text-sm text-black font-medium ml-2 text-opacity-50">
                12.7 K
              </p>
            </div>
          </div>

          <h3 className="font-semibold mt-3">{nft?.name ?? '<asset name>'}</h3>

          <p className="text-gray-400 text-sm">
            <span className="font-bold text-black text-base mr-2">
              4.605.294 IDR
            </span>{' '}
            4/20
          </p>

          <p className="text-gray-400 text-sm">{nft?.price ?? '0'} ETH</p>

          <Link href="/arts/woman-in-black">
            <a className="inline-block font-semibold text-blue-500 mt-3 link-wrapped">
              Buy Now
            </a>
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}

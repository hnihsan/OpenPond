import React from 'react';
import Img from '@components/Img';
export default function ExploreItem({ nft }: any) {
  if (nft?.image_url !== '') {
    return (
      <div className="item relative p-5">
        <figure>
          <Img
            className="rounded-xl w-full"
            src={
              nft?.image_url === '' ? 'https://fakeimg.pl/640x360' : nft?.image_url
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
                    src={nft?.creator?.profile_img_url ?? ''}
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
          </figcaption>
        </figure>
      </div>
    );
  } else {
    return <></>;
  }
}

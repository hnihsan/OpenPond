import React, { ReactElement } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {}

export default function FeaturedSkeleton({}: Props): ReactElement {
  return (
    <div className="mt-6 flex -mx-3">
      <div className="w-1/3 px-3">
        <Skeleton height={250} />
      </div>
      <div className="w-2/3 px-3">
        <div className="profile flex items-center">
          <Skeleton circle={true} width={50} height={50} />
          <div className="detail ml-3">
            <Skeleton width={150} />
            <Skeleton width={80} />
          </div>
        </div>

        <Skeleton count={5} className="mt-5" />
      </div>
    </div>
  )
}

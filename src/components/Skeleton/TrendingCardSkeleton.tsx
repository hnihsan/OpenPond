import React, { ReactElement } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {}

export default function TrendingCardSkeleton({}: Props): ReactElement {
  return (
    <div>
      <Skeleton height={250} />
      <div className="flex items-center">
        <Skeleton circle={true} width={40} height={40} />
        <Skeleton width={75} className="ml-4" />
      </div>
      <Skeleton />
      <Skeleton width={175} />
      <Skeleton width={50} />
      <Skeleton width={100} />
    </div>
  )
}

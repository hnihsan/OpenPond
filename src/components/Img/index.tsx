import React, { ReactElement } from 'react'
import Image from 'next/image'
import propTypes from 'prop-types'

interface Props {
  src: string
  alt: string
  className?: string
  width: number | string
  height: number | string
  style?: string
}

function Img({
  src,
  alt,
  className,
  width,
  height,
  style,
}: Props): ReactElement {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      layout="responsive"
      placeholder="blur"
      blurDataURL="data:image/webp;base64,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z9EYHG5G+vQjTw704miHWfy5Wjh8MAwkiYam3B1eLMPOO8Ki9+bSthPxk7LAJ5WQmmgg/+pwk6zV1TDKORIGGoB1iFDdqexqzJY4vi6U6FuGtEO/PdqXWskgal+KynzVHXTxlWiGX23t8d0qkcXubl5yxocYBaoHiZVghE7XOPotznyifXW+jrduKZgHeGrS+dU3/XuAAABFWElGVgAAAE1NACoAAAAQRXhpZk1ldGEABAEaAAUAAAABAAAARgEbAAUAAAABAAAATgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAABWE1QIOoCAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJyB4OnhtcHRrPSdJbWFnZTo6RXhpZlRvb2wgMTAuMTAnPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6dGlmZj0naHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8nPgogIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgPHRpZmY6WFJlc29sdXRpb24+MzAwLzE8L3RpZmY6WFJlc29sdXRpb24+CiAgPHRpZmY6WVJlc29sdXRpb24+MzAwLzE8L3RpZmY6WVJlc29sdXRpb24+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcE1NPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vJz4KICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpzdG9jazo1M2NmM2M2OS1jNjA1LTQ1ZWItYjc0NC0yNjA3ZDk0NzlhOWY8L3htcE1NOkRvY3VtZW50SUQ+CiAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpjNGE0OGMwNS1mYjkzLTRiYWItYWEzMS05NWU5MGY0NTEyNjU8L3htcE1NOkluc3RhbmNlSUQ+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ndyc/Pg=="
    />
  )
}

Img.propsType = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  width: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]).isRequired,
  height: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]).isRequired,
}

export default Img

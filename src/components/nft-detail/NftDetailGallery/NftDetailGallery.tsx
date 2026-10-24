import { mergeClassNames } from '@/utils/mergeClassNames'
import type { NftDetailGalleryProps, NftDetailThumbnail } from '@/types/nftDetail'

type NftDetailThumbnailButtonProps = {
  thumbnail: NftDetailThumbnail
}

function NftDetailThumbnailButton({ thumbnail }: NftDetailThumbnailButtonProps) {
  const thumbnailClassName = mergeClassNames(
    'relative size-[100px] shrink-0 overflow-hidden rounded-lg',
    thumbnail.isActive ? 'border border-primary' : 'border border-transparent',
  )

  return (
    <button className={thumbnailClassName} type="button">
      <img
        alt={thumbnail.imageAlt}
        className="size-full object-cover"
        decoding="async"
        loading="lazy"
        src={thumbnail.imageSrc}
      />
    </button>
  )
}

export function NftDetailGallery({
  thumbnails,
  mainImageSrc,
  mainImageAlt,
}: NftDetailGalleryProps) {
  const thumbnailButtons = thumbnails.map((thumbnail) => (
    <li key={thumbnail.id}>
      <NftDetailThumbnailButton thumbnail={thumbnail} />
    </li>
  ))

  return (
    <div className="flex gap-7">
      <ul className="flex w-[100px] flex-col gap-4">{thumbnailButtons}</ul>
      <div className="flex size-[444px] items-center justify-center rounded-md bg-surface-card p-4">
        <img
          alt={mainImageAlt}
          className="size-[404px] rounded-[24px] object-cover"
          decoding="async"
          fetchPriority="high"
          height={404}
          src={mainImageSrc}
          width={404}
        />
      </div>
    </div>
  )
}

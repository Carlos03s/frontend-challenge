import type { HomeBlogCardProps } from '@/types/homeBlog'

export function HomeBlogCard({
  metadataLabel,
  title,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: HomeBlogCardProps) {
  return (
    <article className="w-full min-w-0 flex-1 overflow-hidden rounded-lg bg-surface-card">
      <img
        alt={imageAlt}
        className="aspect-[268/195] h-auto w-full object-cover"
        decoding="async"
        height={195}
        loading="lazy"
        src={imageSrc}
        width={268}
      />
      <div className="flex flex-col items-start gap-2 px-4 pb-4 pt-3">
        <p className="w-full whitespace-pre-wrap font-mono text-xs font-medium leading-4 text-text-secondary">
          {metadataLabel}
        </p>
        <h3 className="w-full font-mono text-base font-bold leading-none text-text-primary">{title}</h3>
        <p className="w-full font-mono text-xs font-medium leading-4 text-text-secondary">
          {description}
        </p>
        <a
          className="font-mono text-xs font-bold leading-[14px] text-text-accent"
          href={ctaHref}
        >
          {ctaLabel} →
        </a>
      </div>
    </article>
  )
}

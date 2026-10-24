import { HomeBlogCard } from '@/components/home/HomeBlogCard/HomeBlogCard'
import type { HomeBlogProps } from '@/types/homeBlog'

export function HomeBlog({ title, description, blogCards }: HomeBlogProps) {
  const blogCardElements = blogCards.map((blogCard) => (
    <HomeBlogCard key={blogCard.title} {...blogCard} />
  ))

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <h2 className="w-full font-mono text-[28px] font-bold leading-[37px] text-text-primary">
          {title}
        </h2>
        <p className="w-full font-mono text-sm font-normal leading-[18px] text-text-secondary">
          {description}
        </p>
      </div>
      <div className="flex w-full min-w-0 flex-col items-stretch gap-6 lg:flex-row lg:items-start">
        {blogCardElements}
      </div>
    </section>
  )
}

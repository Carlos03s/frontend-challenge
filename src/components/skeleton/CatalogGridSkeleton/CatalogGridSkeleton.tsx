import { Skeleton } from '@/components/ui/skeleton'

const skeletonCardKeys = ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6']

export function CatalogGridSkeleton() {
  const skeletonCards = skeletonCardKeys.map((cardKey) => (
    <li key={cardKey}>
      <div className="flex w-full min-w-0 flex-col gap-3">
        <Skeleton className="aspect-[258/300] w-full rounded-md" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-5 w-24" />
      </div>
    </li>
  ))

  return <ul className="flex flex-wrap gap-7">{skeletonCards}</ul>
}

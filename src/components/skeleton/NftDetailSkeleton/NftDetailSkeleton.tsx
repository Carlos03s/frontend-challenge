import { Skeleton } from '@/components/ui/skeleton'

export function NftDetailSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      <Skeleton className="aspect-square w-full lg:max-w-[560px]" />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  )
}

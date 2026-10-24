import { Skeleton } from '@/components/ui/skeleton'

export function CartSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-16 w-full max-w-sm" />
    </div>
  )
}

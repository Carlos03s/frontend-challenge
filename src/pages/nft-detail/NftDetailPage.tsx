import { useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { PageContent } from '@/components/layout/PageContent/PageContent'
import { MobileNftDetailScreen } from '@/components/mobile/MobileNftDetailScreen/MobileNftDetailScreen'
import { NftDetailProduct } from '@/components/nft-detail/NftDetailProduct/NftDetailProduct'
import { NftDetailSkeleton } from '@/components/skeleton/NftDetailSkeleton/NftDetailSkeleton'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import { addCartItem } from '@/api/cartApi'
import { addFavorite, removeFavorite } from '@/api/favoritesApi'
import { fetchNftDetail } from '@/api/nftsApi'
import { queryKeys } from '@/consts/queryKeys'
import type { NftDetailDto } from '@/types/api/nfts'
import { useSessionQuery } from '@/hooks/useSessionQuery'
import { mapNftDetailDtoToProductProps } from '@/utils/mapNftDetailDtoToProductProps'

export function NftDetailPage() {
  const { nftId } = useParams({ strict: false }) as { nftId: string }
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const sessionQuery = useSessionQuery()
  const [selectedEditionKey, setSelectedEditionKey] = useState('1-50')
  const [quantity, setQuantity] = useState(1)

  const nftDetailQuery = useQuery({
    queryKey: queryKeys.nftDetail(nftId),
    queryFn: () => fetchNftDetail(nftId),
  })

  const addToCartMutation = useMutation({
    mutationFn: () =>
      addCartItem({
        nftId,
        editionKey: selectedEditionKey,
        quantity,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      void navigate({ to: '/carrinho' })
    },
  })

  const favoriteMutation = useMutation({
    mutationFn: async (shouldRemove: boolean) => {
      if (shouldRemove) {
        await removeFavorite(nftId)
        return
      }

      await addFavorite(nftId)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.nftDetail(nftId) })
      const previousNft = queryClient.getQueryData<NftDetailDto>(queryKeys.nftDetail(nftId))

      if (previousNft !== undefined) {
        const nextFavoriteCount = previousNft.isFavorited
          ? Math.max(0, previousNft.favoriteCount - 1)
          : previousNft.favoriteCount + 1

        queryClient.setQueryData<NftDetailDto>(queryKeys.nftDetail(nftId), {
          ...previousNft,
          isFavorited: !previousNft.isFavorited,
          favoriteCount: nextFavoriteCount,
        })
      }

      return { previousNft }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousNft !== undefined) {
        queryClient.setQueryData(queryKeys.nftDetail(nftId), context.previousNft)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.nftDetail(nftId) })
      await queryClient.invalidateQueries({ queryKey: queryKeys.favorites })
    },
  })

  const loadedNft = nftDetailQuery.data
  const selectedEdition = loadedNft?.editions.find((edition) => edition.key === selectedEditionKey)
  const availableQuantity = selectedEdition?.available ?? 0
  const isEditionUnavailable = loadedNft !== undefined && availableQuantity < 1
  const hasLoadedEdition = loadedNft !== undefined && !isEditionUnavailable
  const clampedQuantity = Math.min(quantity, availableQuantity)
  const shouldClampQuantity = hasLoadedEdition && clampedQuantity !== quantity

  if (shouldClampQuantity) {
    setQuantity(clampedQuantity)
  }

  const isPending = nftDetailQuery.isPending
  const isNotFound = nftDetailQuery.isError

  if (isPending) {
    return <NftDetailSkeleton />
  }

  if (isNotFound || nftDetailQuery.data === undefined) {
    return <p className="font-mono text-base text-text-accent">NFT não encontrado.</p>
  }

  const nft = nftDetailQuery.data
  const availabilityMessage = isEditionUnavailable ? 'Edição indisponível.' : undefined

  const handleBuyClick = () => {
    if (isEditionUnavailable) {
      return
    }

    addToCartMutation.mutate()
  }

  const handleFavoriteClick = () => {
    const isAuthenticated = sessionQuery.data !== undefined

    if (!isAuthenticated) {
      void navigate({ to: '/login', search: { redirect: `/nfts/${nftId}` } })
      return
    }

    favoriteMutation.mutate(nft.isFavorited)
  }

  const handleDecreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))
  }

  const handleIncreaseQuantity = () => {
    if (isEditionUnavailable) {
      return
    }

    setQuantity((currentQuantity) => Math.min(availableQuantity, currentQuantity + 1))
  }

  const handleEditionOptionClick = (editionId: string) => {
    setSelectedEditionKey(editionId)
    setQuantity(1)
  }

  const productProps = mapNftDetailDtoToProductProps(nft, {
    selectedEditionKey,
    quantity,
    availabilityMessage,
    isBuyDisabled: isEditionUnavailable,
    onBuyClick: handleBuyClick,
    onFavoriteClick: handleFavoriteClick,
    onDecreaseQuantityClick: handleDecreaseQuantity,
    onIncreaseQuantityClick: handleIncreaseQuantity,
    onEditionOptionClick: handleEditionOptionClick,
  })

  const breadcrumbElement = (
    <PageBreadcrumb label={`Início / Mercado / ${nft.name}`} />
  )

  const productElement = <NftDetailProduct {...productProps} />

  const handleBackClick = () => {
    void navigate({ to: '/' })
  }

  const mobileDetailElement = (
    <MobileNftDetailScreen
      galleryProps={productProps.galleryProps}
      purchasePanelProps={productProps.purchasePanelProps}
      onBackClick={handleBackClick}
    />
  )

  return (
    <>
      {mobileDetailElement}
      <PageContent className="hidden gap-8 lg:flex">
        {breadcrumbElement}
        {productElement}
      </PageContent>
    </>
  )
}

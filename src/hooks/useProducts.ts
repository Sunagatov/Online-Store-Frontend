import { IProductsList } from '@/types/Products'
import { getAllProducts } from '@/services/apiService'
import useSWRInfinite from 'swr/infinite'
import { ISortParams } from '@/types/ISortParams'
import { IOption } from '@/types/Dropdown'

export function useProducts(
  sortOption: IOption<ISortParams>,
  brandOptions: string[],
) {
  const { sortAttribute, sortDirection } = sortOption.value
  const brandNames = brandOptions.join(',') || null

  const getKey = (pageIndex: number, previousData: IProductsList) => {
    if (previousData && previousData.totalPages - 1 == previousData.page)
      return null
    let requestUrl = `products?page=${pageIndex}&size=6&sort_attribute=${sortAttribute}&sort_direction=${sortDirection}`

    requestUrl = brandNames
      ? `${requestUrl}&brand_names=${brandNames}`
      : requestUrl

    return requestUrl
  }

  const { data, error, isLoading, size, setSize } = useSWRInfinite<
    IProductsList,
    Error
  >(getKey, getAllProducts, {
    initialSize: 1,
  })

  const totalPages = data?.[0]?.totalPages ?? 0

  const fetchNext = () => setSize((size) => size + 1)
  const flattenProducts = data?.flatMap((page) => page.products!) ?? []
  const hasNextPage = size < totalPages

  const isFetchingNextPage =
    (isLoading && !error) || // initial loading
    (size > 0 && data && typeof data[size - 1] === 'undefined')

  return {
    data: flattenProducts,
    fetchNext,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  }
}

'use client'

import { useProducts } from '@/hooks/useProducts'
import ProductCard from './ProductCard'
import Loader from '@/components/ui/Loader'

export default function ProductList() {
  const { data, fetchNext, hasNextPage, isLoading, isFetchingNextPage, error } =
    useProducts()

  if (error)
    return (
      <h1 className={'text-red-500 text-4xl  h-screen grid place-items-center'}>
        Error occured: {error.message}
      </h1>
    )
  if (isLoading) {
    return (
      <div className={'h-[54px] flex items-center justify-center mt-14'}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <h1 className={'text-6XL w-[1144px] m-auto mb-10 mt-14'}>All Coffee</h1>

      <section className={'flex flex-col items-center mb-5'}>
        <ul
          className={
            'grid grid-cols-3 gap-y-12 gap-x-8 w-list m-auto mb-[116px]'
          }
        >
          {data.map((product) => (
            <li key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
              />
            </li>
          ))}
        </ul>
        {hasNextPage && !isFetchingNextPage && (
          <button
            className={' w-[145px] h-[54px] rounded-[46px] bg-secondary'}
            onClick={() => {
              fetchNext().catch((e) => console.log(e))
            }}
          >
            Show more
          </button>
        )}
        {isFetchingNextPage && (
          <div className={'h-[54px] flex items-center'}>
            <Loader />
          </div>
        )}
      </section>
    </>
  )
}
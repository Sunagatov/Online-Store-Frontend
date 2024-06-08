import { IProduct } from '@/types/Products'
import ProductCard from '../ProductCard/ProductCard'
import Loader from '@/components/UI/Loader/Loader'

interface IProductListProps {
  products: IProduct[]
  error: Error | undefined
  isLoading: boolean
}

export default function ProductList({
  products,
  error,
  isLoading,
}: Readonly<IProductListProps>) {
  if (error) {
    return (
      <h3
        className={
          'grid h-screen grow place-items-center text-center text-4xl text-black'
        }
      >
        Something went wrong!
      </h3>
    )
  }

  if (isLoading) {
    return (
      <div className={'mt-14 flex h-[54px] grow items-center justify-center'}>
        <Loader />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <h3
        className={
          'grid h-screen grow place-items-center text-center text-4xl text-black'
        }
      >
        No results found for the specified parameters.
      </h3>
    )
  }

  return (
    <ul
      className={
        'grid h-max grow grid-cols-2 gap-x-2 gap-y-7 sm:gap-x-6 min-[1440px]:grid-cols-3'
      }
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

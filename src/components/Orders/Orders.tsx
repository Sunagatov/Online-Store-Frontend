'use client'

import React, { useEffect, useState } from 'react'
import { api } from '@/services/apiConfig/apiConfig'
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useCombinedStore } from '@/store/store'
import Image from 'next/image'
import order from '../../../public/orders_stub.png'
import Button from '@/components/UI/Buttons/Button/Button'
import Link from 'next/link'
import { useStoreData } from '@/hooks/useStoreData'
import { useSearchParams } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { CacheAxiosResponse } from 'axios-cache-interceptor'

interface PaymentSessionStatus {
  status: string
  customerEmail: string
}

export default function OrdersForm() {
  const [status, setStatus] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const token: string | null | undefined = useStoreData(
    useAuthStore,
    (state) => state.token,
  )
  const resetCart = useCombinedStore((state) => state.resetCart)
  const router: AppRouterInstance = useRouter()
  const urlParams: ReadonlyURLSearchParams = useSearchParams()

  useEffect(() => {
    const sessionId: string | null = urlParams.get('sessionId')
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    if (token) {
      api
        .get<PaymentSessionStatus>(
          `/payment/status?sessionID=${sessionId}`,
          config,
        )
        .then(
          (
            res: CacheAxiosResponse<PaymentSessionStatus>,
          ): PaymentSessionStatus => res.data,
        )
        .then((data: PaymentSessionStatus) => {
          setStatus(data.status)
          setCustomerEmail(data.customerEmail)
        })
        .catch((err) => console.error(err))
    }
  }, [token, urlParams])

  useEffect(() => {
    if (status === 'open') {
      router.push('/checkout')
    }
    resetCart() // FIXME: it doesn't drop the counter
  }, [status, resetCart, router])

  return (
    <section id="success" className="p-4">
      <p className="flex items-center justify-center text-center md:text-left">
        A confirmation email will be sent to {customerEmail}.
      </p>
      <p className="flex items-center justify-center text-center md:text-left">
        If you have any questions, please email
        <a href="mailto:orders@iced-latte.com" className="ml-1">
          orders@iced-latte.com
        </a>
        .
      </p>
      <div className="mt-2 flex flex-col items-center gap-2 py-2 md:mt-4 md:gap-3 md:py-2 lg:mt-4 lg:gap-3 lg:py-2">
        <Image
          className="h-auto w-full max-w-xs md:max-w-md lg:max-w-lg"
          src={order}
          alt="Picture of order"
          width={500}
          height={500}
        />
        <Button
          id="continue-btn"
          className="h-14 w-full max-w-[211px] text-lg font-medium"
        >
          <Link href={'/'}>Continue Shopping</Link>
        </Button>
      </div>
    </section>
  )
}

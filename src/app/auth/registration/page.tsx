'use client'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import LoginForm from '@/components/modals/forms/LoginForm'
import RegistrationForm from '@/components/modals/forms/RegistrationForm'
import Link from 'next/link'

type AuthModalProps = {
  onCloseModal?: () => void
}

enum SwitchType {
  Login = 'LOGIN',
  Registration = 'REGISTRATION',
}

function AuthModalRegistr({ onCloseModal }: AuthModalProps) {
  const [switchForm, setSwitchForm] = useState<SwitchType>(
    SwitchType.Registration,
  )
  const pathname = usePathname()

  if (pathname === '/') return null

  const handleClickSwitchForm = () => {
    setSwitchForm(
      switchForm === SwitchType.Login
        ? SwitchType.Registration
        : SwitchType.Login,
    )
  }

  return (
    <div className={'fixed bottom-0 right-0 top-14 z-30 flex w-full sm:top-24'}>
      <Link
        href="/"
        className={'grow-0 bg-gray-500 bg-opacity-75 min-[440px]:grow'}
        onClick={onCloseModal}
      ></Link>
      <div className="flex h-full w-full flex-col overflow-y-scroll bg-white py-6 shadow-xl min-[440px]:w-[500px]">
        <div className="px-4 sm:px-6">
          <h2 className="text-4XL">Welcome back</h2>
        </div>
        <div className="relative flex-1 px-4 sm:px-6">
          {switchForm === SwitchType.Registration ? (
            <RegistrationForm />
          ) : (
            <Button
              onClick={handleClickSwitchForm}
              className="mt-6 w-full hover:bg-brand-solid-hover"
            >
              Login
            </Button>
          )}
          <div className="mb-8 mt-6 h-[1px] w-full bg-brand-second" />
          <h2 className="text-4XL">Already have an account?</h2>
          {switchForm === SwitchType.Login ? (
            <LoginForm />
          ) : (
            <Button
              onClick={handleClickSwitchForm}
              className="mt-6 w-full hover:bg-brand-solid-hover"
            >
              Login
            </Button>
          )}
          <p className="text-text-tertiary mt-4 text-xs font-medium">
            By registering for an account, you agree to our{' '}
            <a
              className="text-text-tertiary text-xs font-medium underline"
              href="/"
            >
              Terms of Use.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default AuthModalRegistr
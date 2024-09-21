'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SiteLogo } from '@/components/svg'
import { Icon } from '@iconify/react'
import { MFLogo } from '@/components/svg'

const schema = z.object({
  email: z.string().email({ message: 'Your email is invalid.' }),
  password: z.string().min(4)
})
import { useMediaQuery } from '@/hooks/use-media-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import handleError from '@/validation/unauthorized'

const LogInForm = () => {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState(false)
  const [passwordType, setPasswordType] = React.useState('password')
  const [errorMessage, setErrorMessage] = React.useState('')
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)')

  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password')
    } else if (passwordType === 'password') {
      setPasswordType('text')
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all'
  })

  const onSubmit = async formData => {
    try {
      setIsPending(true)
      setErrorMessage('') // Clear any previous error messages
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/login`,
        formData
      )

      if (res.status === 200) {
        toast.success('Login Successful')
        Cookies.set('authToken', res.data.token)
        const permissions = JSON.stringify(res.data.permissions)
        localStorage.setItem('userEmail', res.data.email)
        localStorage.setItem('userId', res.data.id)
        localStorage.setItem('userName', res.data.userName)
        localStorage.setItem('userRole', res.data.role) // Store user's role
        localStorage.setItem('userPermissions', permissions) // Store user's permissions
        setIsPending(false)
        if (permissions.includes('analytics:read')) router.push('/dashboard')
        else if (permissions.includes('bnyGeneral:read'))
          router.push('/face-detection')
        else if (permissions.includes('users:read')) router.push('/users')
        else router.push('/error-page/401')
      }
    } catch (err) {
      setIsPending(false)
      if (err.response.status === 409) {
        setErrorMessage('Invalid email or password. Please try again.') // Set error message
        toast.error('Invalid email or password')
        return
      }
      handleError(err, router)
    }
  }

  const authenticateUser = async () => {
    const authToken = Cookies.get('authToken')
    if (authToken) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/authenticate`,
          {
            headers: {
              'x-auth-token': authToken
            }
          }
        )
        if (response.status === 200) {
          router.push('/dashboard')
        }
      } catch (error) {
        handleError(error, router)
      }
    } else {
      router.push('/auth/login')
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])
  return (
    <div className='w-full py-10'>
      <Link href='/dashboard' className='inline-block'>
        <MFLogo className='text-primary' width='400px' height='50px' />
      </Link>
      <div className='xl:mt-8 mt-6 xl:text-xl text-xl font-bold text-default-900'></div>
      {/* <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6">
        Enter the information you entered while registering.
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5 2xl:mt-7'>
        <div>
          <Label htmlFor='email' className='mb-2 font-medium text-default-600'>
            Email{' '}
          </Label>
          <Input
            disabled={isPending}
            {...register('email')}
            type='email'
            id='email'
            className={cn('', {
              'border-destructive': errors.email
            })}
            placeholder='Enter your email'
            size={!isDesktop2xl ? 'xl' : 'lg'}
          />
        </div>
        {errors.email && (
          <div className=' text-destructive mt-2'>{errors.email.message}</div>
        )}

        <div className='mt-3.5'>
          <Label
            htmlFor='password'
            className='mb-2 font-medium text-default-600'
          >
            Password{' '}
          </Label>
          <div className='relative'>
            <Input
              disabled={isPending}
              {...register('password')}
              type={passwordType}
              id='password'
              className='peer '
              size={!isDesktop2xl ? 'xl' : 'lg'}
              placeholder='Enter your password'
            />

            <div
              role='button'
              className='absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer'
              onClick={togglePasswordType}
            >
              {passwordType === 'password' ? (
                <Icon
                  icon='heroicons:eye'
                  className='w-5 h-5 text-default-400'
                />
              ) : (
                <Icon
                  icon='heroicons:eye-slash'
                  className='w-5 h-5 text-default-400'
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className=' text-destructive mt-2'>
            {errors.password.message}
          </div>
        )}

        <div className='mt-5 flex flex-wrap gap-2'>
          {/* <div className='flex-1 flex  items-center gap-1.5 '></div>
          <Link href='/auth/forgot' className='flex-none text-sm text-primary'>
            Forget Password?
          </Link> */}
        </div>
        {errorMessage && (
          <div className='text-destructive mt-3 mb-3  text-center'>
            {errorMessage}
          </div>
        )}

        <Button
          className='w-full'
          disabled={isPending}
          size={!isDesktop2xl ? 'lg' : 'md'}
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isPending ? 'Loading...' : 'Sign In'}
        </Button>
        {/* Error Message */}
      </form>
    </div>
  )
}

export default LogInForm

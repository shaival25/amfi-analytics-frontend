'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import avatar5 from '@/public/images/avatar/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
const ProfileInfo = () => {
  const router = useRouter()

  const signOut = () => {
    Cookies.remove('authToken')
    localStorage.clear()
    router.push('/auth/login')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=' cursor-pointer'>
        <div className=' flex items-center  '>
          <Image
            src={avatar5}
            alt=''
            width={36}
            height={36}
            className='rounded-full'
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 p-0' align='end'>
        <DropdownMenuLabel className='flex gap-2 items-center mb-1 p-3'>
          <Image
            src={avatar5}
            alt=''
            width={36}
            height={36}
            className='rounded-full'
          />

          <div>
            <div className='text-sm font-medium text-default-800 capitalize '>
              {localStorage.getItem('userName')}
            </div>
            <span
              href='/dashboard'
              className='text-xs text-default-600 hover:text-primary'
            >
              {localStorage.getItem('userEmail')}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator className='mb-0 dark:bg-background' />
        <DropdownMenuItem
          onClick={() => signOut()}
          className='flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer'
        >
          <Icon icon='heroicons:power' className='w-4 h-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ProfileInfo

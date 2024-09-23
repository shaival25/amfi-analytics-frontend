'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger
} from '@/components/ui/select'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import handleError from '@/validation/unauthorized'

const schema = z.object({
  email: z.string().email({ message: 'Your email is invalid.' }),
  password: z.string().min(4),
  username: z.string().min(3)
})
const DialogForm = ({ fetchRoles, fetchUserDetails }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all'
  })
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [roles, setRoles] = useState([])
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  })

  const fetchRole = async () => {
    if (roles.length > 0) return
    setRoles(await fetchRoles())
  }
  const onSubmit = async () => {
    setErrorMessage('')
    if (!user.username || !user.email || !user.password || !user.role) {
      setErrorMessage('All fields are required!') // Set error message
      return toast.error('All fields are required!')
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/register`,
        user,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 201) {
        toast.success('User created successfully!')
        setUser({
          username: '',
          email: '',
          password: '',
          role: ''
        })
        fetchUserDetails()
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error(error?.response?.data?.msg)
        setErrorMessage(error?.response?.data?.msg)
        return
      }
      setUser({
        username: '',
        email: '',
        password: '',
        role: ''
      })
      handleError(error, router)
    }
  }

  return (
    <Dialog>
      <DialogTrigger onClick={fetchRole} asChild>
        <Button>
          <Plus />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent size='2xl'>
        <DialogHeader className='p-0'>
          <DialogTitle className='text-base font-medium text-default-700 '>
            Create a New User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className='h-[250px]'>
              <ScrollArea className='h-full'>
                <div className='sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0'>
                  <div className='flex flex-col gap-2'>
                    <Label>User Name</Label>
                    <Input
                      {...register('username')}
                      value={user.username}
                      onChange={e =>
                        setUser({ ...user, username: e.target.value })
                      }
                      className={cn('', {
                        'border-destructive': errors.username
                      })}
                      type='text'
                      placeholder='Enter user name'
                    />
                    {errors.username && (
                      <div className=' text-destructive'>
                        {errors.username.message}
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <Label>Email Address</Label>
                    <Input
                      {...register('email')}
                      value={user.email}
                      onChange={e =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className={cn('', {
                        'border-destructive': errors.email
                      })}
                      type='email'
                      placeholder='Enter email address'
                    />
                    {errors.email && (
                      <div className=' text-destructive'>
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <Label>Enter Password</Label>
                    <Input
                      {...register('password')}
                      value={user.password}
                      onChange={e =>
                        setUser({ ...user, password: e.target.value })
                      }
                      className={cn('', {
                        'border-destructive': errors.password
                      })}
                      type='password'
                      placeholder='Your password'
                    />
                    {errors.password && (
                      <div className=' text-destructive mt-2'>
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <Label>Role</Label>
                    <Select
                      value={user.role}
                      onValueChange={value => setUser({ ...user, role: value })}
                      placeholder='Select Role'
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Role' />
                      </SelectTrigger>
                      <SelectContent>
                        {roles?.map(role => (
                          <SelectItem key={role._id} value={role._id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {errorMessage && (
                  <div className='text-red-500 mt-3 mb-3  text-center'>
                    {errorMessage}
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className=' flex justify-center gap-3 mt-4'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSubmit(onSubmit)}>Create Account </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogForm

'use client'
import UserList from './components/UserList'
import AddUser from './components/AddUserDialog'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import handleError from '@/validation/unauthorized'

const UsersPage = ({ trans }) => {
  const [users, setUsers] = useState([])

  const router = useRouter()

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/roles`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      handleError(error, router)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])
  return (
    <div className='space-y-6'>
      <div className='flex items-center flex-wrap justify-between mt-4 gap-4'>
        <div className='text-2xl font-medium text-default-800 '>Users</div>
        {localStorage.getItem('userPermissions')?.includes('users:write') && (
          <AddUser
            fetchRoles={fetchRoles}
            fetchUserDetails={fetchUserDetails}
          />
        )}
      </div>
      <UserList
        fetchRoles={fetchRoles}
        fetchUserDetails={fetchUserDetails}
        trans={trans}
        users={users}
      />
    </div>
  )
}
export default UsersPage

'use client'
import RoleList from './components/RoleList'
import AddRole from './components/AddRole'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import handleError from '@/validation/unauthorized'
const RolePageView = ({ trans }) => {
  const [roles, setRoles] = useState([])

  const router = useRouter()

  const fetchAllPermissions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/permissions`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        return response.data.permissions
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchAllRoles = async () => {
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
        setRoles(response.data)
      }
    } catch (error) {
      handleError(error, router)
    }
  }

  useEffect(() => {
    fetchAllRoles()
  }, [])
  return (
    <div className='space-y-6'>
      <div className='flex items-center flex-wrap justify-between mt-4 gap-4'>
        <div className='text-2xl font-medium text-default-800 '>Roles</div>
        {localStorage.getItem('userPermissions')?.includes('roles:write') && (
          <AddRole
            fetchAllRoles={fetchAllRoles}
            fetchAllPermissions={fetchAllPermissions}
          />
        )}
      </div>
      <RoleList
        fetchAllRoles={fetchAllRoles}
        trans={trans}
        roles={roles}
        fetchAllPermissions={fetchAllPermissions}
      />
    </div>
  )
}

export default RolePageView

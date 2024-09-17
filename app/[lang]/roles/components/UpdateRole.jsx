'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import handleError from '@/validation/unauthorized'

const UpdateRole = ({ icon, fetchAllRoles, id }) => {
  const [updateRole, setUpdateRole] = useState({
    rolename: '',
    permissions: {}
  })

  const [allPermissions, setAllPermissions] = useState([])
  const [permissionTypes, setPermissionTypes] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await fetchRoleById(id)
      await fetchAllPermissions()
    }

    fetchData()
  }, [id])

  // Fetch the role data by ID
  const fetchRoleById = async id => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/roles/${id}`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      setUpdateRole(res.data)
    } catch (error) {
      console.error('Error fetching role:', error)
    }
  }

  // Fetch all permissions
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
        const permissions = response.data.permissions
        setAllPermissions(permissions)
        setPermissionTypes([
          ...new Set(Object.keys(permissions).map(key => key.split(':')[0]))
        ])
        // setPermissionTypes([
        //   ...new Set(permissions.map(p => p.name.split(':')[0]))
        // ])
      }
    } catch (error) {
      console.error('Error fetching permissions:', error)
    }
  }

  // Handle permission switch toggling
  const handleSwitchChange = (permissionType, action) => {
    setUpdateRole(prevRole => {
      const currentPermissions = prevRole.permissions[permissionType] || []

      const hasPermission = currentPermissions.some(permission =>
        permission.name.includes(action)
      )

      let updatedPermissions

      if (hasPermission) {
        // Remove permission if it already exists
        updatedPermissions = currentPermissions.filter(
          permission => !permission.name.includes(action)
        )
      } else {
        // Add permission if it doesn't exist
        updatedPermissions = [
          ...currentPermissions,
          { name: `${permissionType}:${action}` }
        ]
      }

      return {
        ...prevRole,
        permissions: {
          ...prevRole.permissions,
          [permissionType]: updatedPermissions
        }
      }
    })
  }

  // Handle form submission
  const handleUpdateRole = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/roles/${id}`,
        updateRole,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      toast.success('Role updated successfully')

      fetchAllRoles() // Refresh roles
    } catch (error) {
      handleError(error, router)
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          fetchRoleById(id)
          fetchAllPermissions()
        }}
        asChild
      >
        {icon}
      </DialogTrigger>
      <DialogContent size='5xl' className='p-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='text-base font-medium'>
            Update Roles
          </DialogTitle>
        </DialogHeader>
        <div className='max-h-full px-6'>
          <div className='sm:grid sm:grid-cols-1 sm:gap-5 space-y-4 sm:space-y-0'>
            <div className='flex flex-col gap-2'>
              <Label>Role Name</Label>
              <Input
                value={updateRole?.rolename || ''}
                onChange={e =>
                  setUpdateRole({ ...updateRole, rolename: e.target.value })
                }
                type='text'
                placeholder='Enter role name'
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permissions</TableHead>
                <TableHead>Read</TableHead>
                <TableHead>Write</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionTypes.map(permissionType => (
                <TableRow key={permissionType}>
                  <TableCell>{permissionType}</TableCell>
                  {['read', 'write', 'update', 'delete'].map(action => {
                    const isDisabled = !allPermissions[permissionType].some(
                      p =>
                        p.name.startsWith(permissionType) &&
                        p.name.endsWith(action)
                    )
                    const isChecked = updateRole.permissions[
                      permissionType
                    ]?.some(
                      permission =>
                        permission.name === `${permissionType}:${action}`
                    )

                    return (
                      <TableCell key={action}>
                        <Switch
                          checked={isChecked}
                          onClick={() =>
                            handleSwitchChange(permissionType, action)
                          }
                          disabled={isDisabled}
                        />
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='p-6 pt-4 flex justify-between'>
          <DialogClose asChild>
            <Button type='button' color='warning'>
              Close
            </Button>
          </DialogClose>

          <Button type='submit' onClick={handleUpdateRole}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateRole

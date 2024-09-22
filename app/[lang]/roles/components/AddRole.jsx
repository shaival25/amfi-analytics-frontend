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
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import handleError from '@/validation/unauthorized'
const AddRole = ({ fetchAllRoles, fetchAllPermissions }) => {
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: {}
  })
  const [allPermissions, setAllPermissions] = useState([])
  const [permissionTypes, setPermissionTypes] = useState([])
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const permissions = await fetchAllPermissions()
      setAllPermissions(permissions)
      setPermissionTypes([
        ...new Set(Object.keys(permissions).map(key => key.split(':')[0]))
      ])
    }
    fetchData()
  }, [fetchAllPermissions])
  // Helper function to check if permission type exists
  const checkPermission = (type, action) => {
    return allPermissions[type].some(
      permission => permission.name === `${type}:${action}`
    )
  }
  // Helper function to check if the permission is enabled for the new role
  const isPermissionEnabled = (type, action) =>
    newRole.permissions[type]?.includes(`${type}:${action}`) || false
  // Handle permission switch toggling
  const handleSwitchChange = (type, action) => {
    setNewRole(prevRole => {
      const currentPermissions = prevRole.permissions[type] || []
      const hasPermission = currentPermissions.includes(`${type}:${action}`)
      let updatedPermissions
      if (hasPermission) {
        // Remove permission if it already exists
        updatedPermissions = currentPermissions.filter(
          permission => permission !== `${type}:${action}`
        )
      } else {
        // Add permission if it doesn't exist
        updatedPermissions = [...currentPermissions, `${type}:${action}`]
      }
      return {
        ...prevRole,
        permissions: {
          ...prevRole.permissions,
          [type]: updatedPermissions
        }
      }
    })
  }
  // Handle form submission
  const handleAddRole = async () => {
    if (!newRole.name) {
      toast.error('Please enter a role name!')
      return
    }
    if (Object.keys(newRole.permissions).length === 0) {
      toast.error('Please select at least one permission!')
      return
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/roles`,
        newRole,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      toast.success('Role added successfully!')
      fetchAllRoles()
      setNewRole({
        name: '',
        permissions: {}
      })
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error(error?.response?.data?.msg)
        return
      }
      setNewRole({
        name: '',
        permissions: {}
      })
      handleError(error, router)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Role
        </Button>
      </DialogTrigger>
      <DialogContent size='5xl' className='p-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='text-base font-medium'>
            Add New Role
          </DialogTitle>
        </DialogHeader>
        <div className='max-h-full px-6'>
          <div className='sm:grid sm:grid-cols-1 sm:gap-5 space-y-4 sm:space-y-0'>
            <div className='flex flex-col gap-2'>
              <Label>Role Name</Label>
              <Input
                value={newRole?.name || ''}
                onChange={e => setNewRole({ ...newRole, name: e.target.value })}
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
              {permissionTypes.map(type => (
                <TableRow key={type}>
                  <TableCell>{type}</TableCell>
                  {['read', 'write', 'update', 'delete'].map(action => {
                    const isDisabled = !checkPermission(type, action)
                    const isChecked = isPermissionEnabled(type, action)
                    return (
                      <TableCell key={action}>
                        <Switch
                          checked={isChecked}
                          onClick={() => handleSwitchChange(type, action)}
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
          <Button type='submit' onClick={handleAddRole}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddRole

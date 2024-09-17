import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import UpdateRole from './UpdateRole'
import handleError from '@/validation/unauthorized'

const RoleList = ({ fetchAllRoles, roles, fetchAllPermissions }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const router = useRouter()

  const handleSelectAll = () => {
    if (selectedRows?.length === roles?.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(roles.map(row => row.id))
    }
  }

  const handleRowSelect = id => {
    const updatedSelectedRows = [...selectedRows]
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(selectedRows.indexOf(id), 1)
    } else {
      updatedSelectedRows.push(id)
    }
    setSelectedRows(updatedSelectedRows)
  }

  const handleDeleteUser = async id => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/roles/${id}`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        toast.success('Role deleted successfully')
        fetchAllRoles()
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('User exists in this role!')
      }
      handleError(error, router)
    }
  }

  return (
    <>
      {roles && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedRows.length === roles.length || 'indeterminate'
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>

              <TableHead className=' font-semibold'>Role Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map(item => (
              <>
                {item.deleted_at ? null : (
                  <TableRow
                    key={item._id}
                    className='hover:bg-muted'
                    data-state={selectedRows.includes(item._id) && 'selected'}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(item._id)}
                        onCheckedChange={() => handleRowSelect(item._id)}
                      />
                    </TableCell>

                    <TableCell>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </TableCell>

                    <TableCell>
                      {item.permissions
                        .map(permission => permission.name)
                        .join(', ')}
                    </TableCell>

                    <TableCell className='flex justify-end'>
                      <div className='flex gap-3'>
                        {localStorage
                          .getItem('userPermissions')
                          ?.includes('roles:update') && (
                          <UpdateRole
                            icon={
                              <Button
                                size='icon'
                                variant='outline'
                                className='h-7 w-7'
                                color='secondary'
                              >
                                <Icon
                                  icon='heroicons:pencil'
                                  className=' h-4 w-4'
                                />
                              </Button>
                            }
                            fetchAllRoles={fetchAllRoles}
                            id={item._id}
                            fetchAllPermissions={fetchAllPermissions}
                          />
                        )}

                        {localStorage
                          .getItem('userPermissions')
                          .includes('roles:delete') && (
                          <Button
                            onClick={() => handleDeleteUser(item._id)}
                            size='icon'
                            variant='outline'
                            className=' h-7 w-7'
                            color='secondary'
                          >
                            <Icon icon='heroicons:trash' className=' h-4 w-4' />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default RoleList

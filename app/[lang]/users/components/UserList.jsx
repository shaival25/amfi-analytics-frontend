'use client'

import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import UpdateDialog from './UpdateDialog'
import toast from 'react-hot-toast'
import handleError from '@/validation/unauthorized'
const UserList = ({ fetchRoles, fetchUserDetails, users }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const router = useRouter()

  const handleSelectAll = event => {
    if (selectedRows?.length === users?.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(users.map(row => row.id))
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
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/${id}`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        if (id === localStorage.getItem('userId')) {
          Cookies.remove('authToken')
          localStorage.clear()
          router.push('/auth/login')
        }
        toast.success('User deleted successfully')
        fetchUserDetails()
      }
    } catch (error) {
      handleError(error, router)
    }
  }

  return (
    <>
      {users && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedRows.length === users.length || 'indeterminate'
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>

              <TableHead className=' font-semibold'>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map(item => (
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

                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role.name}</TableCell>

                    <TableCell className='flex justify-end'>
                      <div className='flex gap-3'>
                        {localStorage
                          .getItem('userPermissions')
                          ?.includes('users:update') && (
                          <UpdateDialog
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
                            fetchUserDetails={fetchUserDetails}
                            fetchRoles={fetchRoles}
                            id={item._id}
                          />
                        )}

                        {localStorage
                          .getItem('userPermissions')
                          .includes('users:delete') && (
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

export default UserList

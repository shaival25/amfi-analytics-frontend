'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar } from '@/components/ui/avatar'
import axios from 'axios'
import Cookies from 'js-cookie'
import handleError from '@/validation/unauthorized'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CSVLink } from 'react-csv'

const CheckboxWithAction = () => {
  const [users, setUsers] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const router = useRouter()
  const [fileName, setFileName] = useState('')

  const handleSelectAll = event => {
    if (selectedRows?.length === users?.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(users.map(row => row._id))
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
  const fetchFaceDetectionDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/bnyGeneral`,
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
  const handleDeleteUserById = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/bnyGeneral`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          },
          data: {
            selectedRows
          }
        }
      )
      if (response.status === 200) {
        fetchFaceDetectionDetails()
        toast.success('User deleted successfully')
      }
    } catch (error) {
      handleError(error, router)
    }
  }
  useEffect(() => {
    fetchFaceDetectionDetails()
  }, [])

  const calculateAge = dob => {
    const dobDate = new Date(dob)
    const today = new Date()

    let age = today.getFullYear() - dobDate.getFullYear()
    const monthDiff = today.getMonth() - dobDate.getMonth()
    const dayDiff = today.getDate() - dobDate.getDate()
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--
    }

    return age
  }

  const csvHeaders = [
    { label: 'Name', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Gender', key: 'gender' },
    { label: 'City', key: 'city' },
    { label: 'State', key: 'state' },
    { label: 'Phone Number', key: 'contactNumber' },
    { label: 'Age', key: 'age' }
  ]

  const csvData = users.map(user => ({
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    city: user.city,
    state: user.state,
    contactNumber: user.contactNumber,
    age: calculateAge(user.dob)
  }))
  const handleFileName = () => {
    const today = new Date()
    let year = today.getFullYear()
    const month = today.getMonth() + 1
    console.log(month)
    const day = today.getDate()
    const name = 'Users_KYC_data_' + day + '/' + month + '/' + year + '.csv'
    setFileName(name)
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10px'
        }}
      >
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={fileName}
          style={{
            marginTop: '20px',
            marginBottom: '0px'
          }}
        >
          <Button
            className='btn btn-primary'
            style={{ backgroundColor: '#35C2DB' }}
            onClick={handleFileName}
          >
            Export to CSV
          </Button>
        </CSVLink>
      </div>
      {users && (
        <Table>
          <TableHeader>
            <TableRow>
              {localStorage
                .getItem('userPermissions')
                .includes('bnyGeneral:delete') && (
                <TableHead>
                  <Checkbox
                    checked={
                      (selectedRows.length === users.length &&
                        selectedRows.length > 0) ||
                      'indeterminate'
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}

              <TableHead className=' font-semibold'>
                {selectedRows.length === users.length &&
                selectedRows.length > 0 ? (
                  <div className=' flex gap-2'>
                    <Button
                      size='xs'
                      variant='outline'
                      className=' text-xs '
                      color='destructive'
                      onClick={() => handleDeleteUserById()}
                    >
                      Delete all
                    </Button>
                  </div>
                ) : selectedRows.length > 0 ? (
                  <div className=' flex gap-2'>
                    <Button
                      size='xs'
                      variant='outline'
                      className=' text-xs '
                      color='destructive'
                      onClick={() => handleDeleteUserById()}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map(item => (
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
                <TableCell className='font-medium  text-card-foreground/80'>
                  <div className='flex gap-3 items-center'>
                    <Avatar className='rounded-full'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.image}`}
                        alt={item.name}
                      />
                      {/* <AvatarFallback>AB</AvatarFallback> */}
                    </Avatar>
                    <span className=' text-sm   text-card-foreground'>
                      {item.name}
                    </span>
                  </div>
                </TableCell>

                {/* <TableCell>{item.title}</TableCell> */}
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{calculateAge(item.dob)}</TableCell>
                <TableCell>
                  {item.city}, {item.state}
                </TableCell>
                <TableCell>{item.contactNumber}</TableCell>
                {/* <TableCell>
              <Badge
                variant="soft"
                color={
                  (item.role === "admin" && "default") ||
                  (item.role === "member" && "success") ||
                  (item.role === "owner" && "info") ||
                  (item.role === "editor" && "warning")
                }
                className=" capitalize"
              >
                {item.role}
              </Badge>
            </TableCell> */}

                {/* <TableCell className='flex justify-end'>
                  <div className='flex gap-3'>
                    <Button
                      size='icon'
                      variant='outline'
                      color='secondary'
                      className='h-7 w-7'
                    >
                      <Icon icon='heroicons:pencil' className='h-4 w-4' />
                    </Button>
                    <Button
                      size='icon'
                      variant='outline'
                      className='h-7 w-7'
                      color='secondary'
                    >
                      <Icon icon='heroicons:eye' className=' h-4 w-4' />
                    </Button>
                    <Button
                      size='icon'
                      variant='outline'
                      className=' h-7 w-7'
                      color='secondary'
                    >
                      <Icon icon='heroicons:trash' className=' h-4 w-4' />
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default CheckboxWithAction

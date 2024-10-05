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
    { label: 'Bus Name', key: 'busName' },
    { label: 'Age', key: 'age' },
    { label: 'Date', key: 'date' }
  ]

  const csvData = users.map(user => ({
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    city: user.city,
    state: user.state,
    contactNumber: user.contactNumber,
    busName: user.busName,
    date: user.date,
    age: calculateAge(user.dob)
  }))
  const handleFileName = () => {
    const today = new Date()
    let year = today.getFullYear()
    const month = today.getMonth() + 1
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

              <TableHead className='font-semibold'>
                {selectedRows.length === users.length &&
                selectedRows.length > 0 ? (
                  <div className='flex'>
                    <Button
                      size='xs'
                      variant='outline'
                      className='text-xs'
                      color='destructive'
                      onClick={() => handleDeleteUserById()}
                    >
                      Delete all
                    </Button>
                  </div>
                ) : selectedRows.length > 0 ? (
                  <div className='flex'>
                    <Button
                      size='xs'
                      variant='outline'
                      className='text-xs'
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
              <TableHead>Bus Name</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map(item => (
              <TableRow
                key={item._id}
                className='hover:bg-muted'
                data-state={selectedRows.includes(item._id) && 'selected'}
              >
                <TableCell className='p-2'>
                  {' '}
                  {/* Add padding of 2px to reduce the space */}
                  <Checkbox
                    checked={selectedRows.includes(item._id)}
                    onCheckedChange={() => handleRowSelect(item._id)}
                  />
                </TableCell>
                <TableCell className='font-medium text-card-foreground/80 p-2'>
                  {' '}
                  {/* Same padding */}
                  <div className='flex'>
                    <Avatar className='rounded-full'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.image}`}
                        alt={item.name}
                      />
                    </Avatar>
                    <span className='text-sm text-card-foreground'>
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='p-1'>{item.fullName}</TableCell>
                <TableCell className='p-1 email-td text-sm'>
                  {item.email}
                </TableCell>
                <TableCell className='p-1 text-center'>{item.gender}</TableCell>
                <TableCell className='p-2'>{calculateAge(item.dob)}</TableCell>
                <TableCell className='p-2'>
                  {item.city}, {item.state}
                </TableCell>
                <TableCell className='p-2'>{item.contactNumber}</TableCell>
                <TableCell className='p-2'>{item.busName}</TableCell>
                <TableCell className='p-2'>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default CheckboxWithAction

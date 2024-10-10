'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar } from '@/components/ui/avatar'
import axios from 'axios'
import Cookies from 'js-cookie'
import handleError from '@/validation/unauthorized'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Loader from '@/components/layout-loader'

const CheckboxWithAction = () => {
  const [users, setUsers] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const handleSelectAll = () => {
    if (selectedRows.length === users.length) {
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

  const fetchFaceDetectionDetails = async (page = 1, limit = 20) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/bnyGeneral?page=${page}&limit=${limit}`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        setLoading(false)
        setUsers(response.data.data) // Assuming the API sends `users` array
        setTotalPages(response.data.totalPages) // Assuming total pages are calculated in the backend
      }
    } catch (error) {
      setLoading(false)
      handleError(error, router)
    }
  }

  const handleDeleteUserById = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/bnyGeneral/${currentPage}`,
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
        fetchFaceDetectionDetails(currentPage) // Refetch after deletion
        toast.success('User deleted successfully')
      }
    } catch (error) {
      handleError(error, router)
    }
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    fetchFaceDetectionDetails(page)
  }

  useEffect(() => {
    fetchFaceDetectionDetails(currentPage)
  }, [currentPage])

  // Calculate age from date of birth
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

  const downloadExcel = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/downloads/user-data`,
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          },
          responseType: 'blob'
        }
      )
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers['content-type']
        })
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        const today = new Date()
        const filename = `User_Data_${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()}.xlsx`
        link.download = filename
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(link)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert('Something went wrong, please try again later')
    } finally {
      setLoading(false)
    }
  }

  const renderPaginationItems = () => {
    const visiblePages = 5
    const pages = []
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
    const endPage = Math.min(totalPages, startPage + visiblePages - 1)

    // Add ellipsis if needed before startPage
    if (startPage > 1) {
      pages.push(
        <PaginationItem key='first'>
          <PaginationLink href='#' onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pages.push(<PaginationEllipsis key='startEllipsis' />)
      }
    }

    // Add visible page numbers
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationItem key={page}>
          <PaginationLink
            href='#'
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Add ellipsis if needed after endPage
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key='endEllipsis' />)
      }
      pages.push(
        <PaginationItem key='last'>
          <PaginationLink href='#' onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '10px'
            }}
          >
            <Button
              className='btn btn-primary'
              style={{ backgroundColor: '#35C2DB' }}
              onClick={downloadExcel}
            >
              Export to Excel
            </Button>
          </div>
          {users && (
            <>
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
                            />
                          </Avatar>
                        </div>
                      </TableCell>{' '}
                      <TableCell>{item.fullName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{calculateAge(item.dob)}</TableCell>
                      <TableCell>
                        {item.city}, {item.state}
                      </TableCell>
                      <TableCell>{item.contactNumber}</TableCell>
                      <TableCell>{item.busName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <Pagination className='pb-4'>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </>
      )}
    </>
  )
}

export default CheckboxWithAction

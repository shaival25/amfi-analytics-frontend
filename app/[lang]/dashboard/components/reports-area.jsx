'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { Cup, Eye, Increase, Session } from '@/components/svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import handleError from '@/validation/unauthorized'
import { Separator } from '@/components/ui/separator'
import CricketerPreference from './cricketer-reports/cricketerPreference'
const ReportsArea = ({ selectedBuses }) => {
  const reports = [
    {
      id: 1,
      name: 'Page Views',
      count: '11,236',
      rate: '202',
      isUp: false,
      icon: <Eye className='h-4 w-4' />,
      color: 'info'
    },
    {
      id: 2,
      name: 'Sessions',
      count: '6,132',
      rate: '150',
      isUp: true,
      icon: <Session className='h-4 w-4' />,
      color: 'primary'
    },
    {
      id: 3,
      name: 'Avg. Duration',
      count: '46s',
      rate: '22',
      isUp: true,
      icon: <Increase className='h-4 w-4' />,
      color: 'warning'
    },
    {
      id: 4,
      name: 'Bounce Rate',
      count: '46s',
      rate: '30',
      isUp: false,
      icon: <Cup className='h-4 w-4' />,
      color: 'destructive'
    },
    {
      id: 5,
      name: 'Bounce Rate',
      count: '46s',
      rate: '30',
      isUp: false,
      icon: <Cup className='h-4 w-4' />,
      color: 'destructive'
    },
    {
      id: 6,
      name: 'Bounce Rate',
      count: '46s',
      rate: '30',
      isUp: false,
      icon: <Cup className='h-4 w-4' />,
      color: 'destructive'
    },
    {
      id: 7,
      name: 'Bounce Rate',
      count: '46s',
      rate: '30',
      isUp: false,
      icon: <Cup className='h-4 w-4' />,
      color: 'destructive'
    }
  ]
  const [fullCount, setFullCount] = useState(0)
  const [mascotRank, setMascotRank] = useState({})
  const [totalCricketerCount, setTotalCricketerCount] = useState(0)
  const [personCounter, setPersonCounter] = useState(0)
  const [feedbackCounter, setFeedbackCounter] = useState(0)
  const router = useRouter()
  const fetchFullCount = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/full-count`,
        { selectedBuses },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200 && response.data !== fullCount)
        setFullCount(response.data)
    } catch (error) {
      handleError(error, router)
    }
  }
  const fetchMascotRank = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/mascot-count`,
        { selectedBuses },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (
        response.status === 200 &&
        response.data.totalCount !== totalCricketerCount
      ) {
        setMascotRank(response.data.cricketer)
        setTotalCricketerCount(response.data.totalCount)
      }
    } catch (error) {
      handleError(error, router)
    }
  }

  const fetchPersonCounter = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/person-count`,
        { selectedBuses },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200 && response.data !== personCounter)
        setPersonCounter(response.data)
    } catch (error) {
      handleError(error, router)
    }
  }

  const fetchFeedBackCount = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/feedback-count`,
        { selectedBuses },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        setFeedbackCounter(response.data)
      }
    } catch (error) {
      handleError(error, router)
    }
  }
  useEffect(() => {
    fetchFullCount()
    fetchMascotRank()
    fetchPersonCounter()
    fetchFeedBackCount()

    const interval = setInterval(() => {
      fetchFullCount()
      fetchMascotRank()
      fetchPersonCounter()
      fetchFeedBackCount()
    }, 10000)

    return () => clearInterval(interval)
  }, [selectedBuses])
  return (
    <>
      <Card className='mb-4'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-900 flex-1'>
            Total Visitors
          </span>
          <span
            className={cn(
              'flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full'
            )}
          >
            <Eye className='h-4 w-4' />
          </span>
        </CardHeader>
        <CardContent className='pb-4 px-4'>
          <div className='text-2xl font-semibold text-default-900 mb-2.5'>
            {fullCount}
          </div>
        </CardContent>
      </Card>

      <Card className='mb-4'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-900 flex-1'>
            Total Person Count
          </span>
          <span
            className={cn(
              'flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full'
            )}
          >
            <Eye className='h-4 w-4' />
          </span>
        </CardHeader>
        <CardContent className='pb-4 px-4'>
          <div className='text-2xl font-semibold text-default-900 mb-2.5'>
            {personCounter}
          </div>
        </CardContent>
      </Card>
      <Card className='mb-4'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-900 flex-1'>
            Total Feedback Count
          </span>
          <span
            className={cn(
              'flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full'
            )}
          >
            <Eye className='h-4 w-4' />
          </span>
        </CardHeader>
        <CardContent className='pb-4 px-4'>
          <div className='text-2xl font-semibold text-default-900 mb-2.5'>
            {feedbackCounter}
          </div>
        </CardContent>
      </Card>
      <Card className='mb-4 h-full'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2 border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-900 flex-1'>
            Cricketer Preference
          </span>
          <span
            className={cn(
              'flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full'
            )}
          >
            <Session className='h-4 w-4' />
          </span>
        </CardHeader>
        <CardContent className='px-4'>
          <CricketerPreference mascotRank={mascotRank} />
        </CardContent>
      </Card>
    </>
  )
}

export default ReportsArea

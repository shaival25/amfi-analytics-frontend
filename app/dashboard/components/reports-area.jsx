'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Eye, Session } from '@/components/svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import handleError from '@/validation/unauthorized'
import CricketerPreference from './cricketer-reports/cricketerPreference'
import GoalsSelected from './goals-selected/goalsSelected'
const ReportsArea = ({ selectedBuses }) => {
  const [fullCount, setFullCount] = useState(0)
  const [mascotRank, setMascotRank] = useState({})
  const [totalCricketerCount, setTotalCricketerCount] = useState(0)
  const [personCounter, setPersonCounter] = useState(0)
  const [feedbackCounter, setFeedbackCounter] = useState(0)
  const [goalsSelected, setGoalsSelected] = useState({})
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
  const fetchGoalsSelected = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/goals-selected`,
        { selectedBuses },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) {
        setGoalsSelected(response.data.goals)
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
    fetchGoalsSelected()

    const interval = setInterval(() => {
      fetchFullCount()
      fetchMascotRank()
      fetchPersonCounter()
      fetchFeedBackCount()
      fetchGoalsSelected()
    }, 10000)

    return () => clearInterval(interval)
  }, [selectedBuses])
  return (
    <>
      <Card className='mb-4'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-800 flex-1'>
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
          <span className='text-sm font-medium text-default-800 flex-1'>
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
          <span className='text-sm font-medium text-default-800 flex-1'>
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
      <Card className='mb-4'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2 border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-800 flex-1'>
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
      <Card className='mb-4'>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2 border-none mb-0 pb-0'>
          <span className='text-sm font-medium text-default-800 flex-1'>
            Goals Selected
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
          <GoalsSelected goalsSelected={goalsSelected} />
        </CardContent>
      </Card>
    </>
  )
}

export default ReportsArea

'use client'

import ReportsChart from './reports-chart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import DashboardSelect from '../range-select'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { themes } from '@/config/thems'
import { useThemeStore } from '@/store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import handleError from '@/validation/unauthorized'
const ReportsSnapshot = ({ selectedBuses, range, date, selectedTimeSlots }) => {
  const router = useRouter()

  const [liveCount, setLiveCount] = useState([
    {
      name: 'users count',
      data: []
    }
  ])
  const [labels, setLabels] = useState([])
  const fetchLiveCountUsingRange = async (selectedTimeSlots, date) => {
    try {
      const payload = {
        selectedBuses
      }
      if (range == 'custom' && Object.keys(selectedTimeSlots).length > 0) {
        const formattedStartDate = date.from.toLocaleDateString('en-IN')
        const formattedEndDate = date.to.toLocaleDateString('en-IN')
        const timeSlotsArray = Object.keys(selectedTimeSlots).filter(
          timeSlot => selectedTimeSlots[timeSlot]
        )
        payload['startDate'] = formattedStartDate
        payload['endDate'] = formattedEndDate
        payload['selectedTimeSlots'] = timeSlotsArray.map(slot => {
          const [start, end] = slot.split(' - ')
          return `${start}:00`
        })
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/live-count/${range}`,
        { ...payload },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (range == 'custom') {
        setLiveCount(response.data.counts) // Directly setting the counts (series data)
        setLabels(response.data.labels)
      } else {
        setLiveCount([{ data: response.data.counts }])
        setLabels(response.data.labels)
      }
    } catch (error) {
      handleError(error, router)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveCountUsingRange(selectedTimeSlots, date)
    }, 60000)

    fetchLiveCountUsingRange(selectedTimeSlots, date)

    return () => clearInterval(interval)
  }, [range, selectedBuses, selectedTimeSlots, date])

  const { theme: config, setTheme: setConfig } = useThemeStore()
  const theme = themes.find(theme => theme.name === config)
  const primary = `hsl(${theme?.cssVars['light'].primary})`

  return (
    <Card>
      <CardHeader className='border-none pb-0'>
        <div className='flex items-center gap-2 flex-wrap '>
          <div className='flex-1'>
            <div className='text-xl font-semibold text-default-800'>
              Live Visitors Count{' '}
              <svg className='inline-flex' width='40' height='40'>
                <circle fill='#ff0000' stroke='none' cx='20' cy='20' r='8'>
                  <animate
                    attributeName='opacity'
                    dur='1s'
                    values='0;1;0'
                    repeatCount='indefinite'
                    begin='0.1'
                  />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-1 md:p-5'>
        {/* charts data */}
        {liveCount?.length > 0 && (
          <ReportsChart
            series={liveCount}
            chartColor={primary}
            labels={labels}
            range={range}
          />
        )}
        {/* <ReportsChart series={liveCount} /> */}
      </CardContent>
    </Card>
  )
}

export default ReportsSnapshot

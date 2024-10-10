import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import BarChart from './BarChart'
import handleError from '@/validation/unauthorized'
const UserInteractions = ({
  selectedBuses,
  router,
  selectedTimeSlots,
  date,
  range
}) => {
  const [barData, setBarData] = useState({})
  const fetchUserInteractionsUsingRange = async () => {
    try {
      const payload = {
        selectedBuses,
        range: range == 'custom' || range == 'all' ? range : parseInt(range)
      }
      if (range == 'custom' && Object.keys(selectedTimeSlots).length > 0) {
        const formattedStartDate = date?.from?.toLocaleDateString('en-IN')
        const formattedEndDate = date?.to?.toLocaleDateString('en-IN')
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
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/user-interactions`,
        {
          ...payload
        },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.data.success === true) {
        setBarData(response.data)
      }
    } catch (error) {
      handleError(error, router)
    }
  }
  useEffect(() => {
    fetchUserInteractionsUsingRange()
  }, [selectedTimeSlots, date, range, selectedBuses])
  return (
    <Card className='mb-4'>
      <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
        <span className='text-sm font-medium text-default-800 flex-1'>
          User Interaction
        </span>
      </CardHeader>
      <CardContent>
        <BarChart barData={barData} />
      </CardContent>
    </Card>
  )
}

export default UserInteractions

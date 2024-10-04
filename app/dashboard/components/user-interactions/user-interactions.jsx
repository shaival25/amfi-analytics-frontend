import { Card, CardContent, CardHeader } from '@/components/ui/card'
import SelectRange from './select-range'
import TimeSlot from '../heat-maps/time-slot'
import DatePicker from '../heat-maps/date-picker'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import BarChart from './BarChart'
import handleError from '@/validation/unauthorized'
const UserInteractions = ({ selectedBuses, router }) => {
  const [barData, setBarData] = useState({})
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [date, setDate] = useState(new Date())
  const fetchUserInteractionsUsingRange = async () => {
    try {
      const formattedDate = date.toLocaleDateString('en-CA')
      const timeSlotsArray = Object.keys(selectedTimeSlots).filter(
        timeSlot => selectedTimeSlots[timeSlot]
      )
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/user-interactions`,
        {
          selectedBuses,
          selectedDate: formattedDate,
          selectedTimeSlots: timeSlotsArray.map(slot => {
            const [start, end] = slot.split(' - ')
            return `${start}:00`
          })
        },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.data.success === true) {
        setBarData(response.data.data)
      }
    } catch (error) {
      handleError(error, router)
    }
  }
  useEffect(() => {
    fetchUserInteractionsUsingRange()
  }, [selectedTimeSlots, date, selectedBuses])
  return (
    <Card className='mb-4'>
      <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
        <span className='text-sm font-medium text-default-800 flex-1'>
          User Interaction
        </span>

        <div className='flex gap-2'>
          <TimeSlot
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          />
          <DatePicker date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent>
        <BarChart barData={barData} />
      </CardContent>
    </Card>
  )
}

export default UserInteractions

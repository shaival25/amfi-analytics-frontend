import { Card, CardContent, CardHeader } from '@/components/ui/card'
import SelectRange from './select-range'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import BarChart from './BarChart'
const UserInteractions = ({ selectedBuses }) => {
  const [range, setRange] = useState('default')
  const [barData, setBarData] = useState({})

  const fetchUserInteractionsUsingRange = async range => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/user-interactions`,
      {
        selectedBuses,
        option: range
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
  }
  useEffect(() => {
    fetchUserInteractionsUsingRange(range)
  }, [range, selectedBuses])
  return (
    <Card className='mb-4'>
      <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
        <span className='text-sm font-medium text-default-800 flex-1'>
          User Interaction
        </span>

        <div className='flex-none'>
          <SelectRange setRange={setRange} />
        </div>
      </CardHeader>
      <CardContent>
        <BarChart barData={barData} />
      </CardContent>
    </Card>
  )
}

export default UserInteractions

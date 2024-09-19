import { Card, CardContent, CardHeader } from '@/components/ui/card'
import SelectRange from './select-range'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
const UserInteractions = ({ selectedBuses }) => {
  const [range, setRange] = useState('default')

  const fetchUserInteractionsUsingRange = range => {
    const response = axios.post(
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
    console.log(response)
  }
  useEffect(() => {
    fetchUserInteractionsUsingRange(range)
  }, [range])
  return (
    <Card className='mb-4 h-full'>
      <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
        <span className='text-sm font-medium text-default-900 flex-1'>
          User Interaction
        </span>

        <div className='flex-none'>
          <SelectRange setRange={setRange} />
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default UserInteractions

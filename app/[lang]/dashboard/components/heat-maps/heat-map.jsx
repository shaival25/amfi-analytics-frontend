import { Label } from '@/components/ui/label'
import handleError from '@/validation/unauthorized'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const HeatMap = ({ selectedBuses }) => {
  const router = useRouter()
  const [heatMaps, setHeatMaps] = useState([])

  const fetchHeatMaps = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/heat-map`,
        { selectedBuses },
        {
          headers: {
            'x-auth-token': Cookies.get('authToken')
          }
        }
      )
      if (response.status === 200) setHeatMaps(response.data.heatMaps)
    } catch (error) {
      handleError(error, router)
    }
  }
  useEffect(() => {
    fetchHeatMaps()
  }, [selectedBuses])
  return (
    <>
      {heatMaps?.map(heatMap => (
        <div key={heatMap.busName} className='flex flex-col gap-2 mt-4'>
          <Label>{heatMap.busName}</Label>
          <img width={200} height={200} src={heatMap.image} alt='heatMap' />
          <span>Date: {heatMap.date}</span>
          <span>Time: {heatMap.time}</span>
        </div>
      ))}
    </>
  )
}
export default HeatMap

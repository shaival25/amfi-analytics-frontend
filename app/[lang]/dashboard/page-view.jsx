'use client'
import ReportsSnapshot from './components/reports-snapshot'
import ReportsArea from './components/reports-area'
import BusSelect from './components/bus-select'
import HeatMapArea from './components/heat-maps/heat-map'
import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const DashboardPageView = ({ trans }) => {
  const [selectedBuses, setSelectedBuses] = useState(['all']) // 'all' is selected by default

  return (
    <div className='space-y-6'>
      <div className='flex items-center flex-wrap justify-between gap-4'>
        <div className='text-2xl font-medium text-default-800 '>
          Analytics {trans?.dashboard}
        </div>
      </div>
      <BusSelect
        selectedBuses={selectedBuses}
        setSelectedBuses={setSelectedBuses}
      />

      {/* reports area */}
      <div className='grid grid-cols-1  gap-2 '>
        <div className='col-span-1 lg:col-span-1'>
          <ReportsSnapshot selectedBuses={selectedBuses} />
        </div>
      </div>
      <div className='grid grid-cols-3  gap-2 '>
        <ReportsArea selectedBuses={selectedBuses} />
      </div>
      <Card>
        <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
          Heat Maps
        </CardHeader>
        <CardContent className=' mb-2'>
          <HeatMapArea
            className='grid grid-cols-4 gap-2 mt-2'
            selectedBuses={selectedBuses}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPageView

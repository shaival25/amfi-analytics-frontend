'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/ui/select'

import { useState } from 'react'
import TimeSlot from './heat-maps/time-slot'
import DatePicker from './heat-maps/date-picker'

const DashboardSelect = ({
  setRange,
  date,
  setDate,
  selectedTimeSlots,
  setSelectedTimeSlots
}) => {
  const [showTimeSlot, setShowTimeSlot] = useState(false)

  return (
    <>
      {showTimeSlot && (
        <>
          <TimeSlot
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          />
          <DatePicker date={date} setDate={setDate} mode='range' />
        </>
      )}
      <Select
        onValueChange={value => {
          setRange(value)
          if (value === 'custom') {
            setShowTimeSlot(true)
          } else {
            setShowTimeSlot(false)
          }
        }}
        defaultValue='1'
      >
        <SelectTrigger className='w-[150px]'>
          <SelectValue
            placeholder='Select Range'
            className='whitespace-nowrap'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>All Time</SelectItem>
            <SelectItem value='1'>1 Hour</SelectItem>
            <SelectItem value='6'>6 Hours</SelectItem>
            <SelectItem value='24'>1 Day</SelectItem>
          </SelectGroup>
          <SelectItem value='custom'>Custom</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

export default DashboardSelect

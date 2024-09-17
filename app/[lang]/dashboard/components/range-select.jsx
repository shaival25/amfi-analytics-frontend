'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const DashboardSelect = ({ setRange }) => {
  return (
    <Select
      onValueChange={value => {
        setRange(value)
      }}
      defaultValue='1'
    >
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Select Range' className='whitespace-nowrap' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>1 Hour</SelectItem>
        <SelectItem value='6'>6 Hours</SelectItem>
        <SelectItem value='24'>1 Day</SelectItem>
        <SelectItem value='720'>1 Month</SelectItem>
        <SelectItem value='8760'>1 Year</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default DashboardSelect

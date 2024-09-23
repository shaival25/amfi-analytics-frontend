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
      defaultValue='default'
    >
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Select Range' className='whitespace-nowrap' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='default'>1 Day</SelectItem>
        <SelectItem value='1-week'>1 Week</SelectItem>
        <SelectItem value='1-month'>1 Month</SelectItem>
        <SelectItem value='all-time'>All Time</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default DashboardSelect

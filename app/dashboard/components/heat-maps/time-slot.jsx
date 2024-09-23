import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const HeatMapTimeSlot = () => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({})

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const startTime =
      i.toString().padStart(2, '0') +
      ':00 - ' +
      (i + 1).toString().padStart(2, '0') +
      ':00'
    return {
      value: startTime,
      label: startTime
    }
  })

  useEffect(() => {
    const date = new Date()
    const hour = date.getHours()
    setSelectedTimeSlots({
      [timeSlots[hour].value]: true
    })
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='justify-between'>
          Time Slot <Clock className='ltr:ml-auto  h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='grid grid-cols-2 gap-2 px-4'>
          {timeSlots.map(timeSlot => (
            <DropdownMenuCheckboxItem
              key={timeSlot.value}
              checked={selectedTimeSlots[timeSlot.value]}
              onCheckedChange={checked => {
                setSelectedTimeSlots({
                  ...selectedTimeSlots,
                  [timeSlot.value]: checked
                })
              }}
              value={timeSlot.value}
            >
              {timeSlot.label}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeatMapTimeSlot

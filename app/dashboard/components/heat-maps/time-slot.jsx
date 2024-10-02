import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { useEffect } from 'react'

const HeatMapTimeSlot = ({ selectedTimeSlots, setSelectedTimeSlots }) => {
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
    setSelectedTimeSlots(
      timeSlots.reduce((acc, curr) => {
        acc[curr.value] = true
        return acc
      }, {})
    )
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='justify-between gap-3'>
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

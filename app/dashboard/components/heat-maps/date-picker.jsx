import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'

const HeatMapDatePicker = ({ date, setDate, mode = 'single' }) => {
  const formatRange = dateRange => {
    return dateRange && dateRange.from
      ? `${format(dateRange.from, 'dd/MM/yy')} - ${format(
          dateRange.to,
          'dd/MM/yy'
        )}`
      : 'Select a range'
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[240px] ltr:pl-3 text-left overflow-hidden text-ellipsis'
          )}
        >
          {mode === 'single' ? (
            <>{date ? format(date, 'PPP') : <span>Pick a date</span>}</>
          ) : (
            <>
              {date?.from && date?.to ? (
                formatRange(date)
              ) : (
                <span>Select a range</span>
              )}
            </>
          )}
          <CalendarIcon className='ltr:ml-auto  h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <DayPicker
          selected={date}
          onSelect={setDate}
          mode={mode}
          initialFocus
          className={cn('p-0 md:p-3')}
          classNames={{
            months: 'w-full  space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-sm font-medium',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              buttonVariants({ variant: 'outline' }),
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
            ),
            nav_button_previous: 'absolute left-2',
            nav_button_next: 'absolute right-2',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'flex-1 text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
            row: 'flex w-full gap-1 mt-2',
            cell: 'flex-1 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:rounded-md focus-within:relative focus-within:z-20',
            day: 'w-full h-10 rounded  p-0 font-normal aria-selected:opacity-100 bg-transparent text-current hover:text-primary',
            day_selected:
              'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-accent text-accent-foreground',
            day_outside: 'text-muted-foreground opacity-50',
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle:
              'aria-selected:bg-accent aria-selected:text-accent-foreground',
            day_hidden: 'invisible'
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default HeatMapDatePicker

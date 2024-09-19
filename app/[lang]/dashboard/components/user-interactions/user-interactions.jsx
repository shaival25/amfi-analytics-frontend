import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Eye } from '@/components/svg'
import { cn } from '@/lib/utils'
const UserInteractions = ({ selectedBuses }) => {
  return (
    <Card className='mb-4'>
      <CardHeader className='flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0'>
        <span className='text-sm font-medium text-default-900 flex-1'>
          User Interaction
        </span>
        <span
          className={cn(
            'flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full'
          )}
        >
          <Eye className='h-4 w-4' />
        </span>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default UserInteractions

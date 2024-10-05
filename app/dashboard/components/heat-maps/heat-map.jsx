import { Label } from '@radix-ui/react-label'

const HeatMap = ({ heatMaps }) => {
  return (
    <div className='grid grid-cols-4 gap-2 mt-4'>
      {heatMaps?.map((heatMap, index) => (
        <div key={index} className='grid gap-2'>
          <Label>{heatMap.busName}</Label>
          <img width={300} height={300} src={heatMap.image} alt='heatMap' />
          {/* <div className='fs-6 text-gray-600'>
            <span>Date: {heatMap.date}</span>
            <span>Time: {heatMap.time}</span>
          </div> */}
        </div>
      ))}
    </div>
  )
}
export default HeatMap

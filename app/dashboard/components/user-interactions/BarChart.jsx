'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BasicBar = ({ height = 350, barData }) => {
  // Check if barData exists and has series data
  if (!barData || !barData.series || barData.series.length === 0) {
    return <div>No data available</div> // You can customize this message
  }

  const seriesData = barData.series[0] // Get the first series object

  // Now we can safely access properties of seriesData
  const data = {
    // Set the x-axis labels to the bus names from the series data
    labels: seriesData.data.map(item => item.x), // Use seriesData.data to get the x values

    datasets: [
      {
        label: seriesData.name || 'Avg Duration', // Use the series name
        data: seriesData.data.map(item => item.y), // Map y values from series data
        backgroundColor: '#4CAF50', // Set a single color for all bars
        borderColor: '#4CAF50',
        borderWidth: 2,
        barThickness: 25
      }
    ]
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0)'
        }
      },
      x: {
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0)'
        }
      }
    },
    maintainAspectRatio: false
  }

  return (
    <div>
      <Bar options={options} data={data} height={height} width={'100%'} />
    </div>
  )
}

export default BasicBar

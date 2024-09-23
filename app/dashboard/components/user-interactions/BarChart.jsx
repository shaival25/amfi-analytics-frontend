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
import { hslToHex, hexToRGB } from '@/lib/utils'
import { useThemeStore } from '@/store'
import { useTheme } from 'next-themes'
import { themes } from '@/config/thems'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BasicBar = ({ height = 350, barData }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore()
  const { theme: mode } = useTheme()

  const theme = themes.find(theme => theme.name === config)

  const hslPrimary = `hsla(${theme?.cssVars['light'].primary})`
  const hslSuccess = `hsla(${theme?.cssVars['light'].success})`

  const data = {
    labels: barData?.labels,
    datasets: barData.datasets
      ? barData.datasets.map((barData, index) => {
          const colors = ['#FFC107', '#4CAF50', '#2196F3', '#9C27B0']
          return {
            ...barData, // Spread existing properties
            fill: false,
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            borderWidth: 2,
            borderSkipped: 'bottom',
            barThickness: 25
          }
        })
      : []
  }

  const options = {
    responsive: true,

    scales: {
      y: {
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0)'
        },
        ticks: {
          color: `hsl(${theme?.cssVars['light'].chartLabel})`
        }
      },
      x: {
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0)'
        },

        ticks: {
          color: `hsl(${theme?.cssVars['light'].chartLabel})`
        }
      }
    },

    maintainAspectRatio: false
  }

  return (
    <div>
      <Bar options={options} data={data} height={height} />
    </div>
  )
}

export default BasicBar

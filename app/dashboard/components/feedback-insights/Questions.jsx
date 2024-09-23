'use client'
import React, { useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useThemeStore } from '@/store'
import { useTheme } from 'next-themes'
import { themes } from '@/config/thems'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const QuestionBar = ({ height = 350, barData, index }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore()
  const { theme: mode } = useTheme()

  const theme = themes.find(theme => theme.name === config)
  const colors = ['#FFC107', '#4CAF50', '#2196F3', '#9C27B0']

  const data = {
    labels: barData?.labels,
    datasets: barData.datasets
      ? barData.datasets.map(barData => {
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
          color: `hsl(${
            theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel
          })`
        }
      },
      x: {
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0)'
        },

        ticks: {
          color: `hsl(${
            theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel
          })`
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

export default QuestionBar

'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CricketerPreference = ({ height = 250, goalsSelected }) => {
  // Use state for series and options
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false
      }
    },
    colors: [
      '#FF5A5F', // bold red
      '#00BFFF', // bright blue
      '#7CFC00', // neon green
      '#FF69B4', // hot pink
      '#8A2BE2', // vivid purple
      '#FFD700' // gold
    ],
    labels: [],
    dataLabels: {
      enabled: true
    },
    tooltip: {
      theme: 'light'
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      pie: {
        expanOnClick: true,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600
            },
            value: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom',

      itemMargin: {
        horizontal: 10,
        vertical: 8
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: -5
      }
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  })

  useEffect(() => {
    if (goalsSelected) {
      const updatedSeries = Object.keys(goalsSelected).map(
        goal => goalsSelected[goal]
      )
      const updatedLabels = Object.keys(goalsSelected)

      setSeries(updatedSeries)
      setOptions(prevOptions => ({
        ...prevOptions,
        labels: updatedLabels
      }))
    }
  }, [goalsSelected])

  return (
    <Chart
      options={options}
      series={series}
      type='donut'
      height={height}
      width={'100%'}
    />
  )
}

export default CricketerPreference

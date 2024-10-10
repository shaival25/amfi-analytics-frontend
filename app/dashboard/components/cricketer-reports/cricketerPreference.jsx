'use client'

import dynamic from 'next/dynamic'
import { useThemeStore } from '@/store'
import { useTheme } from 'next-themes'
import { themes } from '@/config/thems'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CricketerPreference = ({ height = 250, mascotRank, totalCount }) => {
  const { theme: config, isRtl } = useThemeStore()
  const { theme: mode } = useTheme()
  const theme = themes.find(theme => theme.name === config)

  // Use state for series and options
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false
      }
    },
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
        offsetX: isRtl ? 5 : -5
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
    if (mascotRank) {
      const updatedSeries = Object.keys(mascotRank).map(
        mascot => mascotRank[mascot]
      )
      const updatedLabels = Object.keys(mascotRank)

      setSeries(updatedSeries)
      setOptions(prevOptions => ({
        ...prevOptions,
        labels: updatedLabels
      }))
    }
  }, [mascotRank])

  return totalCount > 0 ? (
    <Chart
      options={options}
      series={series}
      type='donut'
      height={height}
      width={'100%'}
    />
  ) : (
    <div>No data available</div>
  )
}

export default CricketerPreference

'use client'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useThemeStore } from '@/store'
import { useTheme } from 'next-themes'
import { themes } from '@/config/thems'
import {
  getGridConfig,
  getXAxisConfig,
  getYAxisConfig
} from '@/lib/appex-chart-options'

const ReportsChart = ({ series, chartColor, height = 300, labels, range }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore()
  const { theme: mode } = useTheme()

  const theme = themes.find(theme => theme.name === config)

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: range == 'custom' ? 2 : 4
    },
    colors:
      range == 'custom'
        ? [
            '#795548',
            '#607D8B',
            '#03A9F4',
            '#66BB6A',
            '#FFEB3B',
            '#4DB6AC',
            '#E040FB',
            '#8BC34A',
            '#8B9467',
            '#2196F3',
            '#FF9800',
            '#FFC107',
            '#F57C00',
            '#64B5F6',
            '#C2185B',
            '#9C27B0',
            '#9CCC65',
            '#E5E5EA',
            '#009688',
            '#FF5252',
            '#448AFF',
            '#FFC400',
            '#03A9F4',
            '#C0E188',
            '#9FA8DA',
            '#F8E231',
            '#1E88E5',
            '#00E676',
            '#D4E157',
            '#EC407A',
            '#4CAF50',
            '#42A5F5',
            '#66BB6A',
            '#FFEB3B',
            '#4DB6AC',
            '#E040FB',
            '#8B9467',
            '#2196F3',
            '#F57C00',
            '#64B5F6',
            '#C2185B',
            '#9CCC65',
            '#E5E5EA',
            '#FF5252',
            '#448AFF',
            '#FFC400',
            '#E91E63',
            '#9E9E9E',
            '#C0E188',
            '#9FA8DA',
            '#F8E231'
          ]
        : [chartColor],

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [50, 100, 0]
      }
    },
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`
    ),
    xaxis: getXAxisConfig(
      `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
      labels
    ),
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }

  return (
    <>
      {series && series.length > 0 && labels && labels.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type={range == 'custom' ? 'line' : 'area'}
          height={height}
          width={'100%'}
        />
      ) : null}
    </>
  )
}

export default ReportsChart

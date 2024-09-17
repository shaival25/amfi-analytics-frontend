import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider'
import { getDictionary } from '@/app/dictionaries'
import DashboardPage from './dashboard/page'
const layout = async ({ children, params: { lang } }) => {
  const trans = await getDictionary(lang)

  return (
    <DashBoardLayoutProvider trans={trans}>
      <DashboardPage params={{ lang }} />
    </DashBoardLayoutProvider>
  )
}

export default layout

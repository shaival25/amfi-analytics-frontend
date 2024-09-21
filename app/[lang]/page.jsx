import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider'
import { getDictionary } from '@/app/dictionaries'
import LoginPage from './auth/(login)/login/page'
const layout = async ({ children, params: { lang } }) => {
  const trans = await getDictionary(lang)

  return (
    // <DashBoardLayoutProvider trans={trans}>
    <LoginPage params={{ lang }} />
    // </DashBoardLayoutProvider>
  )
}

export default layout

import RolePageView from './page-view'
import { getDictionary } from '@/app/dictionaries'

const RolePage = async ({ params: { lang } }) => {
  const trans = await getDictionary(lang)
  return <RolePageView trans={trans} />
}

export default RolePage

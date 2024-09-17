import { getDictionary } from '@/app/dictionaries'
import UsersPage from './page-view'

const Users = async ({ params: { lang } }) => {
  const trans = await getDictionary(lang)
  return <UsersPage trans={trans} />
}

export default Users

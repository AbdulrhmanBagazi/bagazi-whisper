import { Admin, Resource } from 'react-admin'
import { authProvider } from './auth/authProvider'
import { MyLayout } from './layout/myLayout'
import Dashboard from './pages/dashboard/dashboard'
import { dataProvider } from './data/dataProvider'
import UserResource from './pages/users'

export const App = () => (
  <Admin
    layout={MyLayout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
    requireAuth
  >
    <Resource name="User" {...UserResource} />
  </Admin>
)

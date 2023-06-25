// in src/MyLayout.js
import { Layout, LayoutProps } from 'react-admin'
import { MyAppBar } from './myAppBar'
import MyMenu from './myMenu'

export const MyLayout = (props: LayoutProps) => {
  return (
    <Layout {...props} menu={MyMenu} appBar={MyAppBar}>
      {props.children}
    </Layout>
  )
}

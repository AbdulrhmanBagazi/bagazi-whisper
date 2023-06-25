import {
  DashboardMenuItem,
  Menu,
  MenuItemLink,
  useResourceDefinitions,
  useSidebarState,
  MenuProps
} from 'react-admin'
import { Icons } from '../theme/icons'
import ViewListIcon from '@mui/icons-material/ViewList'

const MyMenu = (props: MenuProps | any) => {
  const resources = useResourceDefinitions()
  const [open] = useSidebarState()

  return (
    <Menu {...props}>
      <DashboardMenuItem />
      {Object.keys(resources).map((name) => {
        return (
          <MenuItemLink
            key={name}
            to={`/${name}`}
            primaryText={
              (resources[name].options && resources[name].options.label) || name
            }
            onClick={props.onMenuClick}
            sidebarIsOpen={open}
            leftIcon={Icons[name] || <ViewListIcon />}
          />
        )
      })}
    </Menu>
  )
}

export default MyMenu

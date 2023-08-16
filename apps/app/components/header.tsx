import { Appbar, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuthHook } from '../hook/auth'

const Header: React.FC<{ title: string; icon: string }> = ({ title, icon }) => {
  const Navigation = useNavigation()
  const loading = useAuthHook((state) => state.loading)

  return (
    <Appbar.Header style={{ justifyContent: 'flex-start' }}>
      <IconButton
        onPress={() => Navigation.goBack()}
        icon={icon}
        size={30}
        disabled={loading}
      />
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export default Header

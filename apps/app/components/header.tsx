import { Appbar, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuthHook } from '../hook/auth'

const Header: React.FC = () => {
  const Navigation = useNavigation()
  const loading = useAuthHook((state) => state.loading)

  return (
    <Appbar.Header style={{ justifyContent: 'flex-end' }}>
      <IconButton
        onPress={() => Navigation.goBack()}
        icon="close-circle"
        size={30}
        disabled={loading}
      />
    </Appbar.Header>
  )
}

export default Header

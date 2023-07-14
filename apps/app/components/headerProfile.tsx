import { Appbar, IconButton, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuthHook } from '../hook/auth'

const HeaderSettings: React.FC = () => {
  const Navigation = useNavigation()
  const username = useAuthHook((state) => state.username)

  return (
    <Appbar.Header style={{ justifyContent: 'space-between' }}>
      <Text
        variant="headlineLarge"
        style={{
          writingDirection: 'ltr',
          marginHorizontal: 5,
          fontWeight: '900'
        }}
      >
        @{username}
      </Text>
      <IconButton icon="cog" onPress={() => Navigation.navigate('Settings')} />
    </Appbar.Header>
  )
}

export default HeaderSettings

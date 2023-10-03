import { Appbar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuthHook } from '../hook/auth'

const HeaderSettings: React.FC = () => {
  const Navigation = useNavigation()
  const { username } = useAuthHook((state) => state)

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
      <Appbar.Action
        icon="cog"
        onPress={() => Navigation.navigate('Settings')}
      />
    </Appbar.Header>
  )
}

export default HeaderSettings

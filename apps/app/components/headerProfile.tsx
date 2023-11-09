import { Appbar, Badge, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuthHook } from '../hook/auth'
import { View } from 'react-native'

const HeaderSettings: React.FC = () => {
  const Navigation = useNavigation()
  const { username, friends } = useAuthHook((state) => state)

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
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Appbar.Action
            icon="account"
            onPress={() =>
              Navigation.navigate('Friends', {
                screen: 'Friend'
              })
            }
          />
          <Badge
            visible={friends.length > 0}
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5
            }}
          >
            {friends.length}
          </Badge>
        </View>
        <Appbar.Action
          icon="cog"
          onPress={() => Navigation.navigate('Settings')}
        />
      </View>
    </Appbar.Header>
  )
}

export default HeaderSettings

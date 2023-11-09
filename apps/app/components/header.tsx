import { Appbar, Badge } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuthHook } from '../hook/auth'
import { useFriendHook } from '../hook/friend'
import { View } from 'react-native'

const Header: React.FC<{
  title: string
  icon: string
  search?: boolean
  friend_requests?: boolean
  friend_requests_loading?: boolean
}> = ({ title, icon, search, friend_requests, friend_requests_loading }) => {
  const Navigation = useNavigation()
  const { loading } = useAuthHook((state) => state)
  const { requests } = useFriendHook((state) => state)

  return (
    <Appbar.Header style={{ justifyContent: 'flex-start' }}>
      <Appbar.Action
        icon={icon}
        disabled={loading}
        onPress={() => Navigation.goBack()}
      />
      <Appbar.Content title={title} />
      {friend_requests ? (
        <View>
          <Appbar.Action
            icon="account-plus"
            disabled={loading || friend_requests_loading}
            onPress={() =>
              Navigation.navigate('Friends', {
                screen: 'Requests'
              })
            }
          />
          <Badge
            visible={requests.length > 0}
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5
            }}
          >
            {requests.length}
          </Badge>
        </View>
      ) : null}
      {search ? (
        <Appbar.Action
          icon="magnify"
          disabled={loading}
          onPress={() =>
            Navigation.navigate('Friends', {
              screen: 'Search'
            })
          }
        />
      ) : null}
    </Appbar.Header>
  )
}

export default Header

import { View } from 'react-native'
import { FAB, Badge } from 'react-native-paper'
import Header from '../../components/header'
import { useNavigation } from '@react-navigation/native'
import {
  useFriend_RequestQuery,
  useFriendsQuery
} from '../../graphql/generated'
import { useSnckHook } from '../../hook/snack'
import { useI18nHook } from '../../hook/i18n'
import { FlashList } from '@shopify/flash-list'
import { useAuthHook } from '../../hook/auth'
import { useFriendHook } from '../../hook/friend'
import Friendlistitem from './ui/friendlistitem'

export default function FriendsScreen() {
  const Navigation = useNavigation()
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const I18n = useI18nHook((state) => state.I18n)
  const friends = useAuthHook((state) => state.friends)
  const updateFriendsList = useAuthHook((state) => state.updateFriendsList)
  const requests = useFriendHook((state) => state.requests)
  const setRequests = useFriendHook((state) => state.setRequests)
  useFriendsQuery({
    onCompleted(data) {
      return updateFriendsList(data.Get_Friends)
    },
    onError() {
      return ShowSnack(I18n.Errors.Unknown)
    }
  })
  const { loading } = useFriend_RequestQuery({
    onCompleted(data) {
      return setRequests(data)
    },
    onError() {
      return ShowSnack(I18n.Errors.Unknown)
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.Friends.Friends} icon="close-circle" />
      <FlashList
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        data={friends}
        renderItem={({ item }) => <Friendlistitem item={item} />}
        estimatedItemSize={100}
      />

      <FAB
        icon="magnify"
        size="small"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0
        }}
        onPress={() =>
          Navigation.navigate('Friends', {
            screen: 'Search'
          })
        }
      />

      <View
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0
        }}
      >
        <FAB
          icon="account"
          size="small"
          disabled={loading}
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
            top: -5,
            right: -5
          }}
        >
          {requests.length}
        </Badge>
      </View>
    </View>
  )
}

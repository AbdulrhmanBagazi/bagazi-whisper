import { View } from 'react-native'
import Header from '../../components/header'
import { useFriends_And_RequestesQuery } from '../../graphql/generated'
import { useSnckHook } from '../../hook/snack'
import { useI18nHook } from '../../hook/i18n'
import { FlashList } from '@shopify/flash-list'
import { useAuthHook } from '../../hook/auth'
import { useFriendHook } from '../../hook/friend'
import Friendlistitem from './ui/friendlistitem'
import { List } from 'react-native-paper'

export default function FriendsScreen() {
  const { ShowSnack } = useSnckHook((state) => state)
  const { I18n } = useI18nHook((state) => state)
  const { friends, updateFriendsList } = useAuthHook((state) => state)
  const { setRequests } = useFriendHook((state) => state)

  const { loading } = useFriends_And_RequestesQuery({
    onCompleted(data) {
      updateFriendsList(data.Get_Friends)
      setRequests(data)
      return
    },
    onError() {
      return ShowSnack(I18n.Errors.Unknown)
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Header
        search
        friend_requests
        friend_requests_loading={loading}
        title={I18n.Friends.Friends}
        icon="close-circle"
      />
      <FlashList
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        data={friends}
        renderItem={({ item }) => <Friendlistitem item={item} />}
        estimatedItemSize={100}
      />
    </View>
  )
}

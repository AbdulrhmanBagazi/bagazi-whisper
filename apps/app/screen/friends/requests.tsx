import { RefreshControl, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Header from '../../components/header'
import { useI18nHook } from '../../hook/i18n'
import { FlashList } from '@shopify/flash-list'
import FriendRequestItem from './ui/friendRequestItem'
import { useFriendHook } from '../../hook/friend'
import { useFriend_RequestQuery } from '../../graphql/generated'
import { useSnckHook } from '../../hook/snack'

export default function FriendsRequestsScreen() {
  const theme = useTheme()
  const { I18n, Direction } = useI18nHook((state) => state)
  const { ShowSnack } = useSnckHook((state) => state)
  const { requests, setRequests } = useFriendHook((state) => state)

  const { loading, refetch } = useFriend_RequestQuery({
    skip: true,
    onCompleted(data) {
      return setRequests(data)
    },
    onError() {
      return ShowSnack(I18n.Errors.Unknown)
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={I18n.FriendsRequests.FriendsRequests}
        icon={
          Direction === 'rtl'
            ? 'arrow-right-bold-circle'
            : 'arrow-left-bold-circle'
        }
      />
      <FlashList
        // alwaysBounceVertical={false}
        // showsVerticalScrollIndicator={false}
        data={requests}
        contentContainerStyle={{ paddingBottom: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={theme.colors.onBackground}
            onRefresh={() => refetch()}
          />
        }
        ListEmptyComponent={
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text variant="labelMedium" style={{ color: 'gray' }}>
              {I18n.FriendsRequests.NoFriendsRequests}
            </Text>
          </View>
        }
        renderItem={({ item }) => <FriendRequestItem item={item} />}
        estimatedItemSize={100}
      />
    </View>
  )
}

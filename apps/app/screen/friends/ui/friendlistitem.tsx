import { ActivityIndicator, List } from 'react-native-paper'
import { Alert } from 'react-native'
import { Friend, useRemove_FriendMutation } from '../../../graphql/generated'
import { useI18nHook } from '../../../hook/i18n'
import { useAuthHook } from '../../../hook/auth'

const Friendlistitem: React.FC<{
  item: Friend
}> = ({ item }) => {
  const { I18n } = useI18nHook((state) => state)
  const { RemoveFriend } = useAuthHook((state) => state)
  const [useRemove, data] = useRemove_FriendMutation({
    onCompleted() {
      return RemoveFriend(item.id)
    }
  })

  return (
    <List.Item
      title={`@${item.username}`}
      onPress={() =>
        Alert.alert(
          I18n.Alert['Alert.Title'],
          `@${item.username} ${I18n.Alert['Alert.Remove']}`,
          [
            {
              text: I18n.Alert.No,
              style: 'cancel'
            },
            {
              text: I18n.Alert.Yes,
              onPress: () =>
                useRemove({
                  variables: {
                    FriendId: item.id
                  }
                })
            }
          ]
        )
      }
      right={(props) =>
        data.loading ? (
          <ActivityIndicator />
        ) : (
          <List.Icon {...props} icon="cancel" color="red" />
        )
      }
    />
  )
}

export default Friendlistitem

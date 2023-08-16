import { ActivityIndicator, IconButton, Text } from 'react-native-paper'
import { Alert, View } from 'react-native'
import { Friend, useRemove_FriendMutation } from '../../../graphql/generated'
import { useI18nHook } from '../../../hook/i18n'
import { useAuthHook } from '../../../hook/auth'

const Friendlistitem: React.FC<{
  item: Friend
}> = ({ item }) => {
  const I18n = useI18nHook((state) => state.I18n)
  const RemoveFriend = useAuthHook((state) => state.RemoveFriend)
  const [useRemove, data] = useRemove_FriendMutation({
    onCompleted() {
      return RemoveFriend(item.id)
    }
  })

  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          justifyContent: 'center',
          padding: 5
        }}
      >
        <Text
          style={{
            writingDirection: 'ltr',
            fontSize: 20
          }}
        >{`@${item.username}`}</Text>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'blue',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 5
        }}
      >
        {data.loading ? (
          <ActivityIndicator />
        ) : (
          <IconButton
            icon="cancel"
            iconColor="red"
            size={25}
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
            disabled={data.loading}
          />
        )}
      </View>
    </View>
  )
}

export default Friendlistitem

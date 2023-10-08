import { IconButton, Text } from 'react-native-paper'
import { View, ActivityIndicator } from 'react-native'
import {
  Requests,
  useAdd_FriendMutation,
  useDecline_FriendMutation
} from '../../../graphql/generated'
import { useI18nHook } from '../../../hook/i18n'
import { useSnckHook } from '../../../hook/snack'
import { useFriendHook } from '../../../hook/friend'
import { useAuthHook } from '../../../hook/auth'

const FriendRequestItem: React.FC<{
  item: Requests
}> = ({ item }) => {
  const { I18n } = useI18nHook((state) => state)
  const { updateRequests } = useFriendHook((state) => state)
  const { AddFriend } = useAuthHook((state) => state)
  const { ShowSnack } = useSnckHook((state) => state)

  const [declineFriendMutation, data_declineFriendMutation] =
    useDecline_FriendMutation({
      onCompleted(data) {
        if (data) {
          AddFriend(item)
          return updateRequests(item.id)
        }
      },
      onError() {
        ShowSnack(I18n.Errors.Unknown)
      }
    })

  const [addFriendMutation, data_addFriendMutation] = useAdd_FriendMutation({
    onCompleted(data) {
      if (data) {
        AddFriend(item)
        return updateRequests(item.id)
      }
    },
    onError() {
      ShowSnack(I18n.Errors.Unknown)
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
        >{`@${item.sender.username}`}</Text>
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
        {data_addFriendMutation.loading ||
        data_declineFriendMutation.loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <IconButton
              icon="cancel"
              iconColor="red"
              size={25}
              onPress={() =>
                declineFriendMutation({
                  variables: {
                    RequestId: item.id
                  }
                })
              }
              disabled={
                data_addFriendMutation.loading ||
                data_declineFriendMutation.loading
              }
            />
            <IconButton
              icon="check"
              iconColor="green"
              size={25}
              onPress={() =>
                addFriendMutation({
                  variables: {
                    FriendId: item.senderId,
                    RequestId: item.id
                  }
                })
              }
              disabled={
                data_addFriendMutation.loading ||
                data_declineFriendMutation.loading
              }
            />
          </>
        )}
      </View>
    </View>
    // <List.Item
    //   titleStyle={{ writingDirection: 'ltr' }}
    //   title={`@${item.sender.username}`}
    //   right={() => (
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         flex: 1,
    //         justifyContent: 'flex-end'
    //       }}
    //     >
    // <ActivityIndicator
    //   animating={
    // data_addFriendMutation.loading ||
    // data_declineFriendMutation.loading
    //   }
    // />
    // <IconButton
    //   icon="cancel"
    //   iconColor="red"
    //   size={20}
    //   // style={{ marginHorizontal: 5 }}
    //   onPress={() =>
    //     declineFriendMutation({
    //       variables: {
    //         RequestId: item.id
    //       }
    //     })
    //   }
    //   disabled={
    //     data_addFriendMutation.loading ||
    //     data_declineFriendMutation.loading
    //   }
    // />
    // <IconButton
    //   icon="check"
    //   iconColor="green"
    //   size={20}
    //   onPress={() =>
    //     addFriendMutation({
    //       variables: {
    //         FriendId: item.senderId,
    //         RequestId: item.id
    //       }
    //     })
    //   }
    //   disabled={
    //     data_addFriendMutation.loading ||
    //     data_declineFriendMutation.loading
    //   }
    // />
    //     </View>
    //   )}
    // />
  )
}

export default FriendRequestItem

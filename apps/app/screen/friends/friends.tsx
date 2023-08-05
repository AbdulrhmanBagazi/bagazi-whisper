import { View } from 'react-native'
import { Divider, FAB, Text, List } from 'react-native-paper'
import Header from '../../components/header'
import { useNavigation } from '@react-navigation/native'
import { Requests, useFriend_RequestQuery } from '../../graphql/generated'
import { useState } from 'react'
import { useSnckHook } from '../../hook/snack'
import { useI18nHook } from '../../hook/i18n'
import { FlashList } from '@shopify/flash-list'
import { useAuthHook } from '../../hook/auth'
import { ScrollView } from 'react-native-gesture-handler'
import { windowWidth } from '../../config/config'

export default function FriendsScreen() {
  const Navigation = useNavigation()
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const I18n = useI18nHook((state) => state.I18n)
  const user = useAuthHook((state) => state.user)

  const [requests, setrequests] = useState<Requests[]>([])
  const { loading } = useFriend_RequestQuery({
    onCompleted(data) {
      return setrequests(data.Get_Friend_Request)
    },
    onError() {
      return ShowSnack(I18n.Errors.Unknown)
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.Friends.Friends} />
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <List.Accordion title={I18n.Friends.FriendsRequests} id="1">
          <View
            style={{
              flex: 1,
              width: windowWidth,
              minHeight: 100
            }}
          >
            <FlashList
              showsVerticalScrollIndicator={false}
              data={requests}
              contentContainerStyle={{ paddingBottom: 50 }}
              alwaysBounceVertical={false}
              ListEmptyComponent={
                <View
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text variant="labelMedium" style={{ color: 'gray' }}>
                    {I18n.Friends.NoFriendsRequests}
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <>
                  <List.Item
                    titleStyle={{ writingDirection: 'ltr' }}
                    title={`@${item.sender.username}`}
                    right={(props) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          justifyContent: 'flex-end'
                        }}
                      >
                        <List.Icon
                          {...props}
                          icon="cancel"
                          color="red"
                          style={{ marginHorizontal: 10 }}
                        />
                        <List.Icon {...props} icon="check" color="green" />
                      </View>
                    )}
                  />
                  <Divider />
                </>
              )}
              estimatedItemSize={100}
            />
          </View>
        </List.Accordion>
        <View
          style={{
            flex: 1,
            width: windowWidth,
            minHeight: 100
          }}
        >
          <FlashList
            showsVerticalScrollIndicator={false}
            data={user?.friends}
            alwaysBounceVertical={false}
            renderItem={({ item }) => <List.Item title={item.username} />}
            estimatedItemSize={100}
          />
        </View>
      </ScrollView>

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
    </View>
  )
}

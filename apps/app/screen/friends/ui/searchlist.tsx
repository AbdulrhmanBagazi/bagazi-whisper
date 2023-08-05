import { Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import {
  Users,
  useSend_Friend_RequestMutation
} from '../../../graphql/generated'
import { useSnckHook } from '../../../hook/snack'
import { useI18nHook } from '../../../hook/i18n'
import { useState } from 'react'

const SeachList: React.FC<{
  user: Users
}> = ({ user }) => {
  const theme = useTheme()
  const I18n = useI18nHook((state) => state.I18n)
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const [requestIDs, setRequestIDs] = useState<String[]>([])
  const [mutateFunction, { loading }] = useSend_Friend_RequestMutation({
    onError() {
      ShowSnack(I18n.Errors.Unknown)
    }
  })

  const Send_Request = async (FriendId: string) => {
    const { data } = await mutateFunction({
      variables: {
        FriendId
      }
    })

    if (data?.Send_Friend_Request?.__typename === 'Request_Status') {
      if (data.Send_Friend_Request.Status) {
        setRequestIDs([...requestIDs, FriendId])
        return ShowSnack(I18n.Sreach.Request_Sent)
      }

      return ShowSnack(I18n.Errors.Unknown)
    }

    if (data?.Send_Friend_Request?.__typename === 'UnknownError') {
      return ShowSnack(I18n.Errors.Unknown)
    }
  }

  return (
    <>
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          variant="bodyLarge"
          // key={index}
          style={{ writingDirection: 'ltr', marginHorizontal: 20 }}
        >
          @{user.username}
        </Text>

        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          onPress={() => Send_Request(user.id)}
          disabled={loading || requestIDs.includes(user.id)}
        />
      </View>
      <Divider />
    </>
  )
}

export default SeachList

import { Chip, IconButton, useTheme, Text } from 'react-native-paper'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useI18nHook } from '../../../../hook/i18n'
import HeaderProfile from '../../../../components/headerProfile'
import { useAuthHook } from '../../../../hook/auth'
import ProfilePost from './post'
import { useProfilePostsHook } from '../../../../hook/profileposts'
import { usePostQuery } from '../../../../graphql/generated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const ProfileUI = () => {
  const theme = useTheme()
  const Navigation = useNavigation()
  const { I18n } = useI18nHook((state) => state)
  const { user, friends } = useAuthHook((state) => state)
  const { count, initialLoading } = useProfilePostsHook((state) => state)
  const { initialposts } = useProfilePostsHook((state) => state)
  const { loading, error, refetch } = usePostQuery({
    onCompleted(data) {
      return initialposts(data)
    }
  })

  return (
    <>
      <HeaderProfile />
      <View style={{ padding: 5 }}>
        {/* <View style={{ flexDirection: 'row' }}>
          <Chip
            icon="account-plus"
            mode="outlined"
            onPress={() =>
              Navigation.navigate('Friends', {
                screen: 'Friend'
              })
            }
            style={{ borderWidth: 0 }}
          >
            {I18n.Profile.Friends}: {friends.length}
          </Chip>
        </View> */}
        <View style={{ flexDirection: 'row' }}>
          <Chip
            icon="account-plus"
            mode="outlined"
            onPress={() =>
              Navigation.navigate('Friends', {
                screen: 'Friend'
              })
            }
            style={{ borderWidth: 0 }}
          >
            {I18n.Profile.Friends}: {friends.length}
          </Chip>
          <Chip
            icon="note"
            mode="outlined"
            disabled
            style={{ borderWidth: 0, width: 125 }}
          >
            {I18n.Profile.Posts}: {count}
          </Chip>
          {/* <Chip
            icon="heart"
            mode="outlined"
            disabled
            style={{ borderWidth: 0 }}
          >
            {I18n.Profile.Likes}: {user?._count.likes}
          </Chip> */}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {loading || initialLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator animating />
          </View>
        ) : error ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 100
            }}
          >
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={100}
              color={theme.colors.surfaceDisabled}
            />
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.surfaceDisabled }}
            >
              {I18n.Errors.Unknown}
            </Text>

            <IconButton icon="refresh" onPress={() => refetch()} />
          </View>
        ) : (
          <ProfilePost />
        )}
      </View>
    </>
  )
}

export default ProfileUI

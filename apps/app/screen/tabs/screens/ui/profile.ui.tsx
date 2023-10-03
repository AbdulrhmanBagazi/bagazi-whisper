import { Chip, Divider } from 'react-native-paper'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useI18nHook } from '../../../../hook/i18n'
import HeaderProfile from '../../../../components/headerProfile'
import { useAuthHook } from '../../../../hook/auth'
import ProfilePost from './post'
import { useProfilePostsHook } from '../../../../hook/profileposts'

const ProfileUI = () => {
  const Navigation = useNavigation()
  const { I18n } = useI18nHook((state) => state)
  const { user, friends } = useAuthHook((state) => state)
  const { count } = useProfilePostsHook((state) => state)

  return (
    <>
      <HeaderProfile />
      <View style={{ padding: 5 }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Chip icon="note" mode="outlined" disabled style={{ borderWidth: 0 }}>
            {I18n.Profile.Posts}: {count}
          </Chip>
          <Chip
            icon="heart"
            mode="outlined"
            disabled
            style={{ borderWidth: 0 }}
          >
            {I18n.Profile.Likes}: {user?._count.likes}
          </Chip>
        </View>
      </View>
      {/* <Divider /> */}
      <ProfilePost />
    </>
  )
}

export default ProfileUI

import { View } from 'react-native'
import { Button, FAB } from 'react-native-paper'
import { TabsScreensProps } from '../../../types/types'
import { useI18nHook } from '../../../hook/i18n'
import { useAuthHook } from '../../../hook/auth'
import ProfileUI from './ui/profile.ui'

const ProfileScreen = ({ navigation }: TabsScreensProps<'Profile'>) => {
  const I18n = useI18nHook((state) => state.I18n)
  const auth = useAuthHook((state) => state.auth)

  if (!auth) {
    return (
      <View style={{ flex: 1, padding: 10, justifyContent: 'flex-end' }}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('Auth', {
              screen: 'SignIn'
            })
          }
          style={{ marginBottom: 20 }}
        >
          {I18n.Profile.SignIn}
        </Button>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ProfileUI />
    </View>
  )
}

export default ProfileScreen

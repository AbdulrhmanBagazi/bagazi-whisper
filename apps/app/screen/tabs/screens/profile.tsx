import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { TabsScreensProps } from '../../../types/types'
import { useI18nHook } from '../../../hook/i18n'
import { useAuthHook } from '../../../hook/auth'

const ProfileScreen = ({ navigation }: TabsScreensProps<'Profile'>) => {
  const I18n = useI18nHook((state) => state.I18n)
  const auth = useAuthHook((state) => state.auth)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1 }}></View>

      <View style={{ marginVertical: 20 }}>
        {auth ? null : (
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('Auth', {
                screen: 'SignIn'
              })
            }
          >
            {I18n.Profile.SignIn}
          </Button>
        )}
      </View>
    </View>
  )
}

export default ProfileScreen

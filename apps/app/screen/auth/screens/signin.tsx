import { SafeAreaView, View } from 'react-native'
import MGoogleButton from '../../../components/googleButton'
import { useI18nHook } from '../../../hook/i18n'
import MAppleButton from '../../../components/appleButton'
import { useThemeHook } from '../../../hook/theme'
import { Divider } from 'react-native-paper'
import { useAuthHook } from '../../../hook/auth'
import { AuthScreensProps } from '../../../types/types'
import { useEffect } from 'react'

export default function SignInScreen({
  navigation
}: AuthScreensProps<'SignIn'>) {
  const I18n = useI18nHook((state) => state.I18n)
  const Dark = useThemeHook((state) => state.Dark)
  const auth = useAuthHook((state) => state.auth)
  const loading = useAuthHook((state) => state.loading)

  useEffect(() => {
    const Load = async () => {
      if (auth && !loading) {
        navigation.replace('Tabs', {
          screen: 'Profile'
        })
        return
      }

      return
    }

    Load()
  }, [auth, loading])

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View style={{ flex: 2 }}>
        <Divider
          style={{ marginVertical: 10, backgroundColor: 'transparent' }}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MGoogleButton text={I18n.SignIn.Google} dark={Dark} />
        <Divider
          style={{ marginVertical: 10, backgroundColor: 'transparent' }}
        />
        <MAppleButton text={I18n.SignIn.Apple} dark={Dark} />
      </View>
    </SafeAreaView>
  )
}

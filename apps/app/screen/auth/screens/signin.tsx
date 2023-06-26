import { SafeAreaView, View } from 'react-native'
import MGoogleButton from '../../../components/googleButton'
import { useI18nHook } from '../../../hook/i18n'
import MAppleButton from '../../../components/appleButton'
import { useThemeHook } from '../../../hook/theme'
import { Divider } from 'react-native-paper'
import Header from '../../../components/header'

export default function SignInScreen() {
  const I18n = useI18nHook((state) => state.I18n)
  const Dark = useThemeHook((state) => state.Dark)

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Header />
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
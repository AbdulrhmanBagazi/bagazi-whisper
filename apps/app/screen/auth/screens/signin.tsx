import { SafeAreaView, View } from 'react-native'
import MGoogleButton from '../../../components/googleButton'
import { useI18nHook } from '../../../hook/i18n'
import MAppleButton from '../../../components/appleButton'
import { useThemeHook } from '../../../hook/theme'
import { Divider } from 'react-native-paper'

export default function SignInScreen() {
  const { I18n } = useI18nHook((state) => state)
  const { Dark } = useThemeHook((state) => state)

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
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          padding: 50
        }}
      >
        <MGoogleButton text={I18n.SignIn.Google} dark={Dark} />
        <Divider
          style={{ marginVertical: 10, backgroundColor: 'transparent' }}
        />
        <MAppleButton text={I18n.SignIn.Apple} dark={Dark} />
      </View>
    </SafeAreaView>
  )
}

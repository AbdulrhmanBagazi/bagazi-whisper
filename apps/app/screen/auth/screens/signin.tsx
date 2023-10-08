import { SafeAreaView, View } from 'react-native'
import MGoogleButton from '../../../components/googleButton'
import { useI18nHook } from '../../../hook/i18n'
import MAppleButton from '../../../components/appleButton'
import { useThemeHook } from '../../../hook/theme'
import { Divider, useTheme } from 'react-native-paper'

export default function SignInScreen() {
  const { I18n } = useI18nHook((state) => state)
  const { Dark } = useThemeHook((state) => state)
  const theme = useTheme()

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
          // flex: 1,
          // justifyContent: 'flex-end',
          padding: 20,
          backgroundColor: theme.colors.primaryContainer,
          margin: 5,
          borderRadius: 20
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

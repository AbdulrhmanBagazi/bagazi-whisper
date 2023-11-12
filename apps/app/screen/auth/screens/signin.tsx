import { Platform, SafeAreaView, View } from 'react-native'
import MGoogleButton from '../../../components/googleButton'
import { useI18nHook } from '../../../hook/i18n'
import MAppleButton from '../../../components/appleButton'
import { useThemeHook } from '../../../hook/theme'
import { Divider, useTheme, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
// import { useApolloClient } from '@apollo/client'
// import { useEffect } from 'react'

export default function SignInScreen() {
  // const client = useApolloClient()
  const Navigation = useNavigation()
  const { I18n } = useI18nHook((state) => state)
  const { Dark } = useThemeHook((state) => state)
  const theme = useTheme()

  // useEffect(() => {
  //   client.resetStore()
  // }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          variant="displayLarge"
          style={{
            fontWeight: '900',
            color: theme.colors.primary
          }}
        >
          WHISPER
        </Text>
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
          style={{
            marginVertical: Platform.OS === 'android' ? 0 : 10,
            backgroundColor: 'transparent'
          }}
        />
        <MAppleButton text={I18n.SignIn.Apple} dark={Dark} />
      </View>
      <Text style={{ textAlign: 'center', marginTop: 10 }}>
        {I18n.SignIn.agreesocial}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          onPress={() => {
            Navigation.navigate('Auth', {
              screen: 'PrivacyScreen'
            })
          }}
        >
          {I18n.SignIn.privacy}
        </Button>
        <Button
          onPress={() => {
            Navigation.navigate('Auth', {
              screen: 'TermsScreen'
            })
          }}
        >
          {I18n.SignIn.terms}
        </Button>
      </View>
    </SafeAreaView>
  )
}

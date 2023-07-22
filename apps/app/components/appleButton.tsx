import * as AppleAuthentication from 'expo-apple-authentication'
import { useAuthHook } from '../hook/auth'
// import { windowWidth } from '../config/config'
import { useSnckHook } from '../hook/snack'
import { useI18nHook } from '../hook/i18n'
import { Button } from 'react-native-paper'
import { View } from 'react-native'

const MAppleButton: React.FC<{ text: string; dark: boolean }> = ({
  text,
  dark
}) => {
  const AppleSignIn = useAuthHook((state) => state.AppleSignIn)
  const loading = useAuthHook((state) => state.loading)
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const I18n = useI18nHook((state) => state.I18n)

  return (
    <View>
      <Button
        mode="elevated"
        icon="apple"
        buttonColor={dark ? '#FFFFFF' : '#000'}
        textColor={dark ? 'black' : 'white'}
        style={{
          // width: windowWidth / 2,
          justifyContent: 'center'
        }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.EMAIL
              ]
            })

            const {
              user: newUser,
              email,
              // nonce,
              identityToken,
              realUserStatus,
              user
            } = credential

            const Response = await AppleSignIn({
              user: newUser,
              email,
              appleId: user,
              identityToken,
              realUserStatus /* etc */
            })
            if (Response === 'error') {
              return ShowSnack(I18n.Errors.Unknown)
            }

            // signed in
          } catch (e: any) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
        disabled={loading}
      >
        {text}
      </Button>
    </View>
  )
}

export default MAppleButton

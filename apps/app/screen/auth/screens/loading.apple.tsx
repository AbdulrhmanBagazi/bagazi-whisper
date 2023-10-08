import * as AppleAuthentication from 'expo-apple-authentication'
import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useSnckHook } from '../../../hook/snack'
import { useAuthHook } from '../../../hook/auth'
import { useI18nHook } from '../../../hook/i18n'
import { useNavigation } from '@react-navigation/native'

export default function LoadingAppleScreen() {
  const Navigation = useNavigation()
  const { I18n } = useI18nHook((state) => state)
  const { ShowSnack } = useSnckHook((state) => state)
  const { AppleSignIn } = useAuthHook((state) => state)

  useEffect(() => {
    const Apple = async () => {
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL]
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
          Navigation.goBack()
          return ShowSnack(I18n.Errors.Unknown)
        }

        // signed in
      } catch (e: any) {
        if (e.code === 'ERR_REQUEST_CANCELED') {
          // handle that the user canceled the sign-in flow
          return Navigation.goBack()
        } else {
          // handle other errors
          return Navigation.goBack()
        }
      }
    }

    Apple()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ActivityIndicator animating={true} />
    </View>
  )
}

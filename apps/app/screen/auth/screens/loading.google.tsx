import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import {
  androidClientId,
  iosClientId,
  webClientId
} from '../../../config/config'
import { useSnckHook } from '../../../hook/snack'
import { useAuthHook } from '../../../hook/auth'
import { useI18nHook } from '../../../hook/i18n'
import { useNavigation } from '@react-navigation/native'

export default function LoadingGoogleScreen() {
  const Navigation = useNavigation()
  const { I18n } = useI18nHook((state) => state)
  const { ShowSnack } = useSnckHook((state) => state)
  const { GoogleSignIn } = useAuthHook((state) => state)
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: webClientId,
    androidClientId: androidClientId,
    iosClientId: iosClientId
  })

  useEffect(() => {
    const Google = async () => {
      if (response?.type) {
        if (response?.type === 'success') {
          if (response.authentication?.idToken) {
            const Response = await GoogleSignIn({
              idToken: response.authentication.idToken
            })
            if (Response === 'error') {
              Navigation.goBack()
              return ShowSnack(I18n.Errors.Unknown)
            }
          }
        } else {
          return Navigation.goBack()
        }
      }
    }

    Google()
  }, [response])

  useEffect(() => {
    if (request) {
      promptAsync()
    }
  }, [request])

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

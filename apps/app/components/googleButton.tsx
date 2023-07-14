import React, { useEffect } from 'react'
import { androidClientId, iosClientId, webClientId } from '../config/config'
import * as Google from 'expo-auth-session/providers/google'
import { useAuthHook } from '../hook/auth'
import { useSnckHook } from '../hook/snack'
import { useI18nHook } from '../hook/i18n'
import { Button } from 'react-native-paper'

const MGoogleButton: React.FC<{ text: String; dark: boolean }> = ({
  text,
  dark
}) => {
  const GoogleSignIn = useAuthHook((state) => state.GoogleSignIn)
  const loading = useAuthHook((state) => state.loading)
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const I18n = useI18nHook((state) => state.I18n)

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: webClientId,
    androidClientId: androidClientId,
    iosClientId: iosClientId
  })

  useEffect(() => {
    const Google = async () => {
      if (response?.type === 'success') {
        if (response.authentication?.idToken) {
          const Response = await GoogleSignIn({
            idToken: response.authentication.idToken
          })
          //check if the user used the email address as Apple account
          if (Response === 'Apple_Account') {
            return ShowSnack(I18n.Errors.Apple_Account)
          }
          if (Response === 'error') {
            return ShowSnack(I18n.Errors.Unknown)
          }
        }
      }
    }

    Google()
  }, [response])

  return (
    <Button
      mode="elevated"
      buttonColor={dark ? '#4285F4' : '#FFFFFF'}
      textColor={dark ? 'white' : '#4285F4'}
      icon="google"
      onPress={() => {
        promptAsync()
      }}
      disabled={loading}
    >
      {text}
    </Button>
  )
}

export default MGoogleButton

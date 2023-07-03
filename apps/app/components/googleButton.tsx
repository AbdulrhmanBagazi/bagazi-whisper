import React, { useEffect } from 'react'
import {
  androidClientId,
  // expoClientId,
  iosClientId,
  webClientId,
  windowWidth
} from '../config/config'
import * as Google from 'expo-auth-session/providers/google'
import { useAuthHook } from '../hook/auth'
// import { GoogleArgs, QueryResponse } from '../types/types'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
// import { makeRedirectUri } from 'expo-auth-session'
import { useSnckHook } from '../hook/snack'
import { useI18nHook } from '../hook/i18n'

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
    // expoClientId: expoClientId,
    // redirectUri: makeRedirectUri({
    //   scheme: 'com.baqazi.thoughts'
    // })
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
    <MaterialCommunityIcons.Button
      name="google"
      backgroundColor={dark ? '#FFFFFF' : '#4285F4'}
      color={dark ? 'black' : 'white'}
      onPress={() => {
        promptAsync()
      }}
      disabled={loading}
      style={{
        width: windowWidth / 2,
        justifyContent: 'center'
      }}
    >
      {text}
    </MaterialCommunityIcons.Button>
  )
}

export default MGoogleButton

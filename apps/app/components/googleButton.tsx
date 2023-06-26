import React, { useEffect } from 'react'
import {
  androidClientId,
  expoClientId,
  iosClientId,
  webClientId,
  windowWidth
} from '../config/config'
import * as Google from 'expo-auth-session/providers/google'
import { useAuthHook } from '../hook/auth'
import { GoogleArgs, QueryResponse } from '../types/types'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { makeRedirectUri } from 'expo-auth-session'

const MGoogleButton: React.FC<{ text: String; dark: boolean }> = ({
  text,
  dark
}) => {
  const GoogleSignIn = useAuthHook((state) => state.GoogleSignIn) as (
    arg0: GoogleArgs
  ) => QueryResponse
  const loading = useAuthHook((state) => state.loading)

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: webClientId,
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    expoClientId: expoClientId,
    redirectUri: makeRedirectUri({
      scheme: 'com.baqazi.thoughts'
    })
  })

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken)
        GoogleSignIn({ idToken: response.authentication.idToken })
    }
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

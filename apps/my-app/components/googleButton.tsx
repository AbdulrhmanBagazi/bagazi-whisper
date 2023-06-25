import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import { View } from 'react-native'
import { androidClientId, expoClientId, iosClientId } from '../config/config'
import * as Google from 'expo-auth-session/providers/google'
// import { Image } from 'expo-image'
import { useAuthHook } from '../hook/auth'
import { GoogleArgs, QueryResponse } from '../types/types'
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
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    expoClientId: expoClientId,
    redirectUri: makeRedirectUri({
      scheme: 'com.wiseman.parttime'
    })
  })

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken)
        GoogleSignIn({ idToken: response.authentication.idToken })
    }
  }, [response])

  return (
    <Button
      mode="contained"
      onPress={() => {
        promptAsync()
      }}
      // labelStyle={styles.label}
      buttonColor={dark ? '#FFFFFF' : '#4285F4'}
      textColor={dark ? 'black' : 'white'}
      uppercase={false}
      disabled={loading}
      contentStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      icon={({ size }) => (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            justifyContent: 'center',
            width: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -15,
            margin: 1,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
            // opacity: loading ? 0.25 : 1
          }}
        >
          {/* <Image
            source={require('../assets/google-logo.png')}
            style={{
              width: size,
              height: size,
              backgroundColor: 'white'
            }}
            transition={1000}
          /> */}
        </View>
      )}
    >
      {text}
    </Button>
  )
}

export default MGoogleButton

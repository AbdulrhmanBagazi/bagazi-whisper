import React from 'react'
import { useAuthHook } from '../hook/auth'
import { Button } from 'react-native-paper'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const MGoogleButton: React.FC<{ text: String; dark: boolean }> = ({
  text
  // dark
}) => {
  const { loading } = useAuthHook((state) => state)
  const Navigation = useNavigation()

  return (
    <Button
      mode="contained"
      buttonColor={'#FFFFFF'}
      textColor={'#000'}
      // icon="google"
      icon={({ size }) => (
        <Image
          source={require('../assets/images/google-logo.png')}
          style={{
            width: size,
            height: size
          }}
        />
      )}
      onPress={() => {
        Navigation.navigate('Auth', {
          screen: 'GoogleLoading'
        })
      }}
      disabled={loading}
    >
      {text}
    </Button>
  )
}

export default MGoogleButton

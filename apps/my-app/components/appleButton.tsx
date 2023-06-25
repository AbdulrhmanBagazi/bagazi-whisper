import * as AppleAuthentication from 'expo-apple-authentication'
import { Button } from 'react-native-paper'
import { useAuthHook } from '../hook/auth'

const MAppleButton: React.FC<{ text: string; dark: boolean }> = ({
  text,
  dark
}) => {
  const AppleSignIn = useAuthHook((state) => state.AppleSignIn)
  const loading = useAuthHook((state) => state.loading)

  return (
    <Button
      mode="contained"
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

          return AppleSignIn({
            user: newUser,
            email,
            appleId: user,
            identityToken,
            realUserStatus /* etc */
          })
          // signed in
        } catch (e: any) {
          if (e.code === 'ERR_REQUEST_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
      buttonColor={dark ? '#FFFFFF' : '#000'}
      textColor={dark ? 'black' : 'white'}
      uppercase={false}
      disabled={loading}
      contentStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      icon="apple"
    >
      {text}
    </Button>
  )
}

export default MAppleButton

import { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useAuthHook } from '../../hook/auth'

export default function LoadingScreen() {
  const Authenticate = useAuthHook((state) => state.Authenticate)

  useEffect(() => {
    Authenticate()
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

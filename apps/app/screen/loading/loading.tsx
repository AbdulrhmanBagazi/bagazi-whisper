import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useAuthHook } from '../../hook/auth'

export default function LoadingScreen() {
  const { Authenticate } = useAuthHook((state) => state)

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

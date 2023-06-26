import { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { RootStackScreenProps } from '../../types/types'
import { useAuthHook } from '../../hook/auth'
// import * as SecureStore from 'expo-secure-store'

export default function LoadingScreen({
  navigation
}: RootStackScreenProps<'Loading'>) {
  const auth = useAuthHook((state) => state.auth)
  const loading = useAuthHook((state) => state.loading)
  const Authenticate = useAuthHook((state) => state.Authenticate)

  useEffect(() => {
    Authenticate()
  }, [])

  useEffect(() => {
    const Load = async () => {
      // const LangStore = await SecureStore.getItemAsync('AppLang')

      // //select language
      // if (LangStore === null) {
      //   navigation.navigate('Tabs', {
      //     screen: 'Home'
      //   })

      //   return
      // }

      if (auth && !loading) {
        navigation.navigate('Tabs', {
          screen: 'Home'
        })
        return
      }

      if (!auth && !loading) {
        navigation.navigate('Tabs', {
          screen: 'Home'
        })

        return
      }

      return
    }

    Load()
  }, [auth, loading])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} />
    </View>
  )
}

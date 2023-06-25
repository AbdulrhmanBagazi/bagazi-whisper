import { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { RootStackScreenProps } from '../../types/types'

export default function LoadingScreen({
  navigation
}: RootStackScreenProps<'Loading'>) {
  useEffect(() => {
    async function Load() {
      return setTimeout(() => {
        navigation.replace('Tabs', {
          screen: 'Home'
        })
      }, 1500)
    }

    Load()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} />
    </View>
  )
}

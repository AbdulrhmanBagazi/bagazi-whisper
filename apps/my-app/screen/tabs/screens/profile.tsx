import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { TabsScreensProps } from '../../../types/types'

// TabsScreensProps<'Profile'>

const ProfileScreen = ({ navigation }: TabsScreensProps<'Profile'>) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>

      <Button
        onPress={() =>
          navigation.navigate('Auth', {
            screen: 'SignIn'
          })
        }
      >
        SignIn
      </Button>
    </View>
  )
}

export default ProfileScreen

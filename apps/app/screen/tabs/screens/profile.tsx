import { View } from 'react-native'
import ProfileUI from './ui/profile.ui'

//{ navigation }: TabsScreensProps<'Profile'>
const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfileUI />
    </View>
  )
}

export default ProfileScreen

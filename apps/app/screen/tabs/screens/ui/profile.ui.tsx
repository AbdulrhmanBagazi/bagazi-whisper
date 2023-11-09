import { View } from 'react-native'
import HeaderProfile from '../../../../components/headerProfile'
import ProfilePost from './post'

const ProfileUI = () => {
  return (
    <>
      <HeaderProfile />
      <View style={{ flex: 1 }}>
        <ProfilePost />
      </View>
    </>
  )
}

export default ProfileUI

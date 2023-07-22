import { View } from 'react-native'
import HomeUI from './ui/home.ui'
import OneSignal from 'react-native-onesignal'
import { useEffect } from 'react'
import { useNotificationnHook } from '../../../hook/notification'

const HomeScreen = () => {
  const UpdateNotification = useNotificationnHook(
    (state) => state.UpdateNotification
  )
  useEffect(() => {
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      if (!response) {
        OneSignal.disablePush(true)
        return UpdateNotification(false)
      }

      return UpdateNotification(true)
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <HomeUI />
    </View>
  )
}

export default HomeScreen

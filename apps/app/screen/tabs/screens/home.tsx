import { View } from 'react-native'
import HomeUI from './ui/home.ui'
import { OneSignal } from 'react-native-onesignal'
import { useEffect } from 'react'
import { useNotificationnHook } from '../../../hook/notification'
import { Appbar } from 'react-native-paper'
import { useI18nHook } from '../../../hook/i18n'

const HomeScreen = () => {
  const { I18n } = useI18nHook()
  const { UpdateNotification } = useNotificationnHook((state) => state)
  useEffect(() => {
    const HandleNotification = async () => {
      const RequestNotification =
        await OneSignal.Notifications.canRequestPermission()

      if (RequestNotification) {
        await OneSignal.Notifications.requestPermission(false)
        const permission = OneSignal.Notifications.hasPermission()

        if (!permission) {
          OneSignal.User.pushSubscription.optOut()
          return UpdateNotification(false)
        }

        if (permission) {
          OneSignal.User.pushSubscription.optIn()
          return UpdateNotification(true)
        }

        return
      } else {
        const optedIn = OneSignal.User.pushSubscription.getOptedIn()
        const permission = OneSignal.Notifications.hasPermission()

        if (!permission) {
          OneSignal.User.pushSubscription.optOut()
          return UpdateNotification(false)
        }

        if (!optedIn) {
          OneSignal.User.pushSubscription.optOut()
          return UpdateNotification(false)
        }

        if (optedIn) {
          OneSignal.User.pushSubscription.optIn()
          return UpdateNotification(true)
        }
      }
    }

    HandleNotification()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={I18n.Home.Title} />
      </Appbar.Header>
      <HomeUI />
    </View>
  )
}

export default HomeScreen

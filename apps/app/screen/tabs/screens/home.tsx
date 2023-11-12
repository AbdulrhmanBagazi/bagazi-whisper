import { View } from 'react-native'
import HomeUI from './ui/home.ui'
import { OneSignal } from 'react-native-onesignal'
import { useEffect, useState } from 'react'
import { useNotificationnHook } from '../../../hook/notification'
import { Appbar, Banner, Card, Text, useTheme } from 'react-native-paper'
import { useI18nHook } from '../../../hook/i18n'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const HomeScreen = () => {
  const [visible, setVisible] = useState(false)
  const { I18n } = useI18nHook()
  const theme = useTheme()
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
        <Appbar.Action
          icon="help-circle-outline"
          onPress={() => setVisible(!visible)}
        />
      </Appbar.Header>
      <View>
        <Banner
          elevation={0}
          visible={visible}
          contentStyle={{
            backgroundColor: theme.colors.primaryContainer
          }}
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={size}
              color={theme.colors.onPrimaryContainer}
            />
          )}
        >
          {I18n.Home.Noteone + '\r\n'}
          {'\r\n'}
          {I18n.Home.Notetwo + '\r\n'}
          {'\r\n'}
          {I18n.Home.NoteThree}
        </Banner>
      </View>
      <HomeUI />
    </View>
  )
}

export default HomeScreen

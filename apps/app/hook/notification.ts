import { create } from 'zustand'
import OneSignal from 'react-native-onesignal'
import { Alert, Linking } from 'react-native'
import { useI18nHook } from './i18n'

type I18nType = {
  ToggleNotification: () => void
  Notification: boolean
  notificationLoading: boolean
  UpdateNotification: (val: boolean) => void
}

export const useNotificationnHook = create<I18nType>((set) => ({
  Notification: false,
  notificationLoading: false,
  ToggleNotification: async () => {
    set(() => ({
      notificationLoading: true
    }))

    const state = await OneSignal.getDeviceState()

    if (state) {
      if (state.hasNotificationPermission) {
        OneSignal.disablePush(!state.isPushDisabled)

        set(() => ({
          notificationLoading: false,
          Notification: state.isPushDisabled
        }))
        return
      } else {
        Alert.alert(
          useI18nHook.getState().I18n.Notifications.AllowNotifications,
          useI18nHook.getState().I18n.Notifications.AllowNotificationsMSG,
          [
            {
              text: useI18nHook.getState().I18n.Notifications.Settings,
              onPress: () => {
                Linking.openSettings()
              }
            },
            {
              text: useI18nHook.getState().I18n.Notifications.Cancel
            }
          ]
        )
        return set(() => ({
          notificationLoading: false,
          Notification: false
        }))
      }

      // return set(() => ({
      //   notificationLoading: false
      // }))
    }
  },
  UpdateNotification: async (val) => {
    set(() => ({
      Notification: val
    }))
  }
}))

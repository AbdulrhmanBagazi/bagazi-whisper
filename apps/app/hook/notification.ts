import { create } from 'zustand'
import { OneSignal } from 'react-native-onesignal'
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

    const optedIn = OneSignal.User.pushSubscription.getOptedIn()
    const permission = OneSignal.Notifications.hasPermission()

    if (!permission) {
      OneSignal.Notifications.requestPermission(true)
      return set(() => ({
        notificationLoading: false,
        Notification: false
      }))
    }

    if (optedIn) {
      OneSignal.User.pushSubscription.optOut()
      return set(() => ({
        notificationLoading: false,
        Notification: false
      }))
    }

    if (!optedIn) {
      OneSignal.User.pushSubscription.optIn()
      return set(() => ({
        notificationLoading: false,
        Notification: true
      }))
    }
  },
  UpdateNotification: async (val) => {
    set(() => ({
      Notification: val
    }))
  }
}))

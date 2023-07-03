import { create } from 'zustand'
import { fetcher, poster } from '../config/api/auth.api'
import { AppleArgs, GoogleArgs, SignTypes, UserTypes } from '../types/types'
// import { Profile } from '../graphql/generated'
// import OneSignal from 'react-native-onesignal'
import * as AppleAuthentication from 'expo-apple-authentication'

type error = 'error'
type success = 'success'
type Apple_Account = 'Apple_Account'
type Google_Account = 'Google_Account'

type returnType = success | error
type ApplereturnType = success | error | Google_Account
type GooglereturnType = success | error | Apple_Account

type AuthContextType = {
  auth: boolean
  user: UserTypes | null
  loading: boolean
  SignOut: () => Promise<returnType>
  GoogleSignIn: (arg0: GoogleArgs) => Promise<GooglereturnType>
  AppleSignIn: (arg0: AppleArgs) => Promise<ApplereturnType>
  Authenticate: () => void
  SignIn: (arg0: SignTypes) => void
}

export const useAuthHook = create<AuthContextType>((set) => ({
  auth: false,
  user: null,
  loading: true,
  SignOut: async () => {
    set(() => ({
      loading: true
    }))

    const [error, data] = await fetcher('/authentication/signout')

    if (error && !data) {
      set(() => ({
        loading: false,
        user: null,
        auth: false
      }))

      return 'error'
    }

    set(() => ({
      loading: false,
      user: null,
      auth: false
    }))

    return 'success'
  },
  GoogleSignIn: async (values: GoogleArgs) => {
    set(() => ({
      loading: true
    }))
    const [error, data]: any[string] = await poster(
      '/authentication/google',
      values
    )

    if (error && !data) {
      if (error.error === 'Apple_Account') {
        set(() => ({
          loading: false,
          user: null
        }))

        return 'Apple_Account'
      }
      set(() => ({
        loading: false,
        user: null
      }))
      // return [error, data]
      return 'error'
    }

    set(() => ({
      loading: false,
      user: data?.user,
      auth: true
    }))

    // if (data?.user?.id) {
    //   OneSignal.setExternalUserId(data?.user?.id)
    // }

    // return [error, data]
    return 'success'
  },
  AppleSignIn: async (values: AppleArgs) => {
    set(() => ({
      loading: true
    }))
    const [error, data]: any[string] = await poster(
      '/authentication/apple',
      values
    )

    if (error && !data) {
      if (error.error === 'Google_Account') {
        set(() => ({
          loading: false,
          user: null
        }))

        return 'Google_Account'
      }
      set(() => ({
        loading: false,
        user: null
      }))
      // return [error, data]
      return 'error'
    }

    set(() => ({
      loading: false,
      user: data?.user,
      auth: true
    }))

    // if (data?.user?.id) {
    //   OneSignal.setExternalUserId(data?.user?.id)
    // }

    // return [error, data]
    return 'success'
  },
  Authenticate: async () => {
    set(() => ({
      loading: true
    }))
    const [error, data] = await fetcher('/authentication')
    if (error && !data) {
      set(() => ({
        loading: false,
        user: null,
        auth: false
      }))

      // setTimeout(() => {
      //   // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
      //   // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 7)
      //   if (Platform.OS === 'ios') {
      //     OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      //       if (!response) {
      //         OneSignal.disablePush(true)
      //       }
      //     })
      //   }
      // }, 1000)

      return [error, data]
    }

    if (data?.user?.type === 'APPLE' && data?.user?.appleId) {
      const check = await AppleAuthentication.getCredentialStateAsync(
        data?.user?.appleId
      )

      if (check === 0) {
        set(() => ({
          loading: false,
          user: null,
          auth: false
        }))
        return
      }
    }

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 7)
    // if (Platform.OS === 'ios') {
    //   OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    //     if (!response) {
    //       OneSignal.disablePush(true)
    //     }
    //   })
    // }

    set(() => ({
      loading: false,
      user: data?.user,
      auth: true
    }))
  },
  SignIn: async (values: SignTypes) => {
    set(() => ({
      loading: true
    }))
    const [error, data]: any[string] = await poster(
      '/authentication/signin',
      values
    )
    if (error && !data) {
      set(() => ({
        loading: false,
        user: null
      }))
      return [error, data]
    }

    set(() => ({
      loading: false,
      user: data?.user,
      auth: true
    }))

    // if (data?.user?.id) {
    //   OneSignal.setExternalUserId(data?.user?.id)
    // }

    return [error, data]
  }
}))

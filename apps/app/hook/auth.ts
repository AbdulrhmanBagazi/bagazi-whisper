import { create } from 'zustand'
import { fetcher, poster } from '../config/api/auth.api'
import { AppleArgs, GoogleArgs, SignTypes, UserTypes } from '../types/types'
// import { Profile } from '../graphql/generated'
import OneSignal from 'react-native-onesignal'
import * as AppleAuthentication from 'expo-apple-authentication'
import { Platform } from 'react-native'

type error = 'error'
type success = 'success'

type returnType = success | error
type ApplereturnType = success | error
type GooglereturnType = success | error

type AuthContextType = {
  auth: boolean
  user: UserTypes | null
  username: string | null
  loading: boolean
  AuthLoading: boolean
  SignOut: () => Promise<returnType>
  GoogleSignIn: (arg0: GoogleArgs) => Promise<GooglereturnType>
  AppleSignIn: (arg0: AppleArgs) => Promise<ApplereturnType>
  Authenticate: () => void
  AddUsername: (username: string) => void
}

export const useAuthHook = create<AuthContextType>((set) => ({
  auth: false,
  user: null,
  username: null,
  loading: false,
  AuthLoading: true,
  AddUsername: async (username: string) => {
    set(() => ({
      loading: true
    }))

    const [error, data] = await fetcher('/authentication/signout')

    if (error && !data) {
      set(() => ({
        loading: false,
        username: null
      }))

      return 'error'
    }

    set(() => ({
      loading: false,
      username
    }))

    return 'success'
  },
  SignOut: async () => {
    set(() => ({
      loading: true
    }))

    const [error, data] = await fetcher('/authentication/signout')

    if (error && !data) {
      set(() => ({
        loading: false,
        user: null,
        auth: false,
        username: null
      }))

      return 'error'
    }

    set(() => ({
      loading: false,
      user: null,
      auth: false,
      username: null
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
      set(() => ({
        loading: false,
        user: null,
        username: null
      }))
      // return [error, data]
      return 'error'
    }

    set(() => ({
      loading: false,
      user: data?.user,
      auth: true,
      username: data?.user.username
    }))

    if (data?.user?.id) {
      OneSignal.setExternalUserId(data?.user?.id)
    }

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
      set(() => ({
        loading: false,
        user: null,
        username: null
      }))
      // return [error, data]
      return 'error'
    }

    set(() => ({
      loading: false,
      user: data?.user,
      auth: true,
      username: data?.user.username
    }))

    if (data?.user?.id) {
      OneSignal.setExternalUserId(data?.user?.id)
    }

    // return [error, data]
    return 'success'
  },
  Authenticate: async () => {
    set(() => ({
      AuthLoading: true
    }))
    const [error, data] = await fetcher('/authentication')
    if (error && !data) {
      set(() => ({
        AuthLoading: false,
        user: null,
        auth: false,
        username: null
      }))

      return [error, data]
    }

    if (data?.user?.apple && data?.user?.appleId) {
      const check = await AppleAuthentication.getCredentialStateAsync(
        data?.user?.appleId
      )

      if (check === 0) {
        set(() => ({
          AuthLoading: false,
          user: null,
          auth: false,
          username: null
        }))
        return
      }
    }

    set(() => ({
      AuthLoading: false,
      user: data?.user,
      auth: true,
      username: data?.user.username
    }))
  }
}))

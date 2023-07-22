import 'react-native-svg'
import {
  NavigatorScreenParams,
  CompositeScreenProps
} from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type UserTypes = {
  email: string
  verfied: boolean
  type: string
  verificationEmail: string
  appleId?: string
  username: string | null
  _count: { friends: number; likes: number; posts: number }
}

export interface user {
  user: UserTypes
}

export type QueryResponse = [
  error: { data: Array<any> | object | string; status: number } | null,
  data: user | any
]

export type GoogleArgs = {
  idToken: string
}

export type AppleArgs = {
  user: String
  email: String | null
  appleId: String
  identityToken: String | null
  realUserStatus: number
}

export type SignTypes = {
  email: string
  password: string
}

// Navigation //
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsStackParamList>
  Auth: NavigatorScreenParams<AuthStackParamList>
  Loading: undefined
  Settings: undefined
  Friends: undefined
  Username: undefined
  Post: undefined
}
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

//Tabs
export type TabsStackParamList = {
  Home: undefined
  Profile: undefined
}

export type TabsScreensProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

//Auth
export type AuthStackParamList = {
  SignIn: undefined
}

export type AuthScreensProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
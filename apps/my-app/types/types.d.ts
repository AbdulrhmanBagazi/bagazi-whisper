import 'react-native-svg'
import { Profile } from '../../graphql/generated'
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
  Profile: Profile | null
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
  identityToken: String
  realUserStatus: number
}

export type SignTypes = {
  email: string
  password: string
}

// export type AuthenticatedTypes = {
//   setAuth: (isAuth: boolean) => void
//   auth: boolean
//   user: UserTypes
//   loading: boolean
//   SignOut: () => void
//   GoogleSignIn: (arg0: GoogleArgs) => void
//   AppleSignIn: (arg0: AppleArgs) => void
//   Authenticate: () => void
//   SignIn: (arg0: SignTypes) => QueryResponse
//   SignUp: (arg0: SignTypes) => QueryResponse
//   UpdateUserProfile: (arg0: Profile) => void
// }

// Navigation //
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsStackParamList>
  Auth: NavigatorScreenParams<AuthStackParamList>
  Loading: undefined
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
    RootStackScreenProps<RootStackParamList>
  >

//Auth
export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

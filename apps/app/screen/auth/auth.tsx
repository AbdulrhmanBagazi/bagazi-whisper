import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from './screens/signin'
//types
import { AuthStackParamList } from '../../types/types'
import LoadingGoogleScreen from './screens/loading.google'
import LoadingAppleScreen from './screens/loading.apple'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="GoogleLoading"
        component={LoadingGoogleScreen}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="AppleLoading"
        component={LoadingAppleScreen}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  )
}

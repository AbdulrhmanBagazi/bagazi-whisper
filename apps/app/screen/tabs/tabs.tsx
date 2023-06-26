import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/home'
import ProfileScreen from './screens/profile'
import { TabsStackParamList } from '../../types/types'
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useI18nHook } from '../../hook/i18n'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator<TabsStackParamList>()

export default function TabsStack() {
  const Navigation = useNavigation()
  const I18n = useI18nHook((state) => state.I18n)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<
            typeof MaterialCommunityIcons
          >['name']

          if (route.name === 'Home') {
            iconName = focused ? 'gamepad-circle' : 'gamepad-circle-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline'
          } else {
            iconName = 'help'
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          )
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: I18n.Home.Title
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="cog"
              onPress={() => Navigation.navigate('Settings')}
            />
          ),
          title: I18n.Profile.Title

          // headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

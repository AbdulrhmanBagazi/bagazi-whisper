import { View } from 'react-native'
import { FAB, Text } from 'react-native-paper'

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FAB
        icon="plus"
        mode="elevated"
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0
        }}
        onPress={() => console.log('Pressed')}
      />
    </View>
  )
}

export default HomeScreen

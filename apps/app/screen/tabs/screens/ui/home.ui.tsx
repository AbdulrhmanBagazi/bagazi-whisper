import { Appbar, Text, useTheme } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { windowHeight } from '../../../../config/config'

const HomeUI = () => {
  const theme = useTheme()

  return (
    <FlashList
      data={[]}
      ListEmptyComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight / 3
          }}
        >
          <MaterialCommunityIcons
            name="note-off"
            size={100}
            color={theme.colors.surfaceDisabled}
          />
        </View>
      )}
      renderItem={({ item }) => <Text>{item}</Text>}
      estimatedItemSize={200}
    />
  )
}

export default HomeUI

import { View } from 'react-native'
import { Button, ButtonProps, useTheme } from 'react-native-paper'

const MyButton: React.FC<ButtonProps> = ({ ...props }) => {
  const theme = useTheme()

  return (
    <View>
      <Button
        {...props}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
        mode="contained"
      >
        {props.children}
      </Button>
    </View>
  )
}

export default MyButton

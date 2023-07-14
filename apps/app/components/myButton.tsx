import { Button, ButtonProps, useTheme } from 'react-native-paper'

const MyButton: React.FC<ButtonProps> = ({ ...props }) => {
  const theme = useTheme()

  return (
    <Button
      {...props}
      buttonColor={theme.colors.primary}
      textColor={theme.colors.onPrimary}
      mode="elevated"
    >
      {props.children}
    </Button>
  )
}

export default MyButton

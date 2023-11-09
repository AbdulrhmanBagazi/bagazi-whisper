import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import { useLikeMutation, Cd } from '../graphql/generated'
import { useSnckHook } from '../hook/snack'
import { useI18nHook } from '../hook/i18n'

const LikeButton: React.FC<{
  id: string
  liked: boolean
  likes: number
}> = ({ id, liked, likes }) => {
  const theme = useTheme()
  const [Like, { loading }] = useLikeMutation()
  const { ShowSnack } = useSnckHook()
  const { I18n } = useI18nHook()

  const LikeHandler = async (id: string) => {
    const { errors } = await Like({
      variables: {
        id,
        type: liked ? Cd.Disconnect : Cd.Connect
      }
    })

    if (errors) {
      return ShowSnack(I18n.Errors.Unknown)
    }
  }

  return (
    <Button
      icon={liked ? 'heart' : 'heart-outline'}
      buttonColor="transparent"
      textColor={theme.colors.error}
      style={{
        borderWidth: 0
      }}
      onPress={() => LikeHandler(id)}
      disabled={loading}
    >
      {likes}
    </Button>
  )
}

export default LikeButton

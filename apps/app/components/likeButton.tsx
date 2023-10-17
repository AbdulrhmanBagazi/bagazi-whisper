import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import { useLikeMutation, Cd } from '../graphql/generated'
import { useFeedPostsHook } from '../hook/feed'
import { useSnckHook } from '../hook/snack'
import { useI18nHook } from '../hook/i18n'

const LikeButton: React.FC<{
  id: string
  liked: boolean
  likes: number
  index: number
}> = ({ id, liked, likes, index }) => {
  const theme = useTheme()
  const [Like, { loading }] = useLikeMutation()
  const { updateFeedPost } = useFeedPostsHook()
  const { ShowSnack } = useSnckHook()
  const { I18n } = useI18nHook()

  const LikeHandler = async (id: string) => {
    const { data, errors } = await Like({
      variables: {
        id,
        type: liked ? Cd.Disconnect : Cd.Connect
      }
    })

    if (errors) {
      return ShowSnack(I18n.Errors.Unknown)
    }

    if (data?.Like) {
      return updateFeedPost(data, index)
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

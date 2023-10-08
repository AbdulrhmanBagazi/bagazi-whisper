import React, { useEffect, useState } from 'react'
import { Button, useTheme } from 'react-native-paper'
import { FeedPosts, useLikeMutation, Cd } from '../graphql/generated'

const LikeButton: React.FC<{ data: FeedPosts }> = ({ data }) => {
  const theme = useTheme()
  const [liked, setliked] = useState(false)
  const [mutateFunction, { loading }] = useLikeMutation()

  useEffect(() => {
    if (data.likes.length >= 1) {
      setliked(true)
    }
  }, [data])

  const LikeHandler = async (id: string) => {
    const { data, errors } = await mutateFunction({
      variables: {
        id,
        type: liked ? Cd.Disconnect : Cd.Connect
      }
    })

    if (data?.Like === true) {
      return setliked(!liked)
    }

    if (data?.Like === false) {
      return setliked(false)
    }

    if (errors) {
      return setliked(false)
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
      onPress={() => LikeHandler(data.id)}
      disabled={loading}
    >
      {data._count.likes +
        (liked && data.likes.length >= 1
          ? 0
          : liked && data.likes.length === 0
          ? 1
          : !liked && data.likes.length >= 1
          ? -1
          : 0)}
    </Button>
  )
}

export default LikeButton

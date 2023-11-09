import { useEffect, useState } from 'react'
import { useAuthHook } from '../../hook/auth'
import { Text } from '../Themed'
import { useI18nHook } from '../../hook/i18n'
import { Comment, FeedPosts } from '../../graphql/generated'

const FeedTag: React.FC<{ data: FeedPosts | Comment }> = ({ data }) => {
  const { user } = useAuthHook((state) => state)
  const { I18n } = useI18nHook((state) => state)
  const [Tag, setTag] = useState('')

  useEffect(() => {
    const CreateTag = async () => {
      const Friend = user?.friends.find(
        (friend) => friend.id === data?.authorId
      )

      if (data?.authorId === user?.id) {
        return setTag(`@${I18n.Tag.You}`)
      } else if (Friend) {
        return setTag(`@${I18n.Tag.Friend}`)
      } else {
        return setTag(`@${I18n.Tag.FriendOfFriend}`)
      }
    }

    CreateTag()
  }, [data])

  return (
    <Text
      style={{
        color: 'gray'
      }}
    >
      {Tag}
    </Text>
  )
}

export default FeedTag

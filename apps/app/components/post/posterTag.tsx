import { useEffect, useState } from 'react'
import { useAuthHook } from '../../hook/auth'
import { Text } from '../Themed'
import { useI18nHook } from '../../hook/i18n'

const PosterTag: React.FC<{ authorId: string }> = ({ authorId }) => {
  const user = useAuthHook((state) => state.user)
  const I18n = useI18nHook((state) => state.I18n)
  const [Tag, setTag] = useState('@')

  useEffect(() => {
    const CreateTag = async () => {
      const Friend = user?.friends.find((friend) => friend.id === authorId)

      if (authorId === user?.id) {
        return setTag(`@${I18n.Tag.You}`)
      }

      if (Friend) {
        return setTag(`@${I18n.Tag.Friend}`)
      }
    }

    CreateTag()
  }, [])

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

export default PosterTag

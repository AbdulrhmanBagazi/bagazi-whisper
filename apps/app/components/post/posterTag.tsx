import { Text } from '../Themed'
import { useI18nHook } from '../../hook/i18n'

const PosterTag: React.FC<{ authorId: string }> = ({ authorId }) => {
  const { I18n } = useI18nHook((state) => state)

  return (
    <Text
      style={{
        color: 'gray'
      }}
    >
      {`@${I18n.Tag.You}`}
    </Text>
  )
}

export default PosterTag

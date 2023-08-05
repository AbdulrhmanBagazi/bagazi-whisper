import { View } from 'react-native'
import { Text, Card, useTheme, Button } from 'react-native-paper'
import PosterTag from './post/posterTag'
import { Post } from '../graphql/generated'

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
  const theme = useTheme()

  return (
    <Card
      style={{
        margin: 5
      }}
    >
      <Card.Content>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 30
          }}
        >
          <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
            {data.body}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions
        style={{
          padding: 0
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            padding: 5
          }}
        >
          <PosterTag authorId={data.authorId} />
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
        >
          <Button
            icon="comment"
            buttonColor="transparent"
            textColor={theme.colors.onBackground}
            style={{
              borderWidth: 0
            }}
          >
            {data._count.comments}
          </Button>

          <Button
            icon="heart"
            buttonColor="transparent"
            textColor={theme.colors.onPrimaryContainer}
            style={{
              borderWidth: 0
            }}
          >
            {data._count.likes}
          </Button>
        </View>
      </Card.Actions>
    </Card>
  )
}

export default PostCard

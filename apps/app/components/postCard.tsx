import { View } from 'react-native'
import { Text, Card, useTheme, Button, Divider } from 'react-native-paper'
import PosterTag from './post/posterTag'
import { Post } from '../graphql/generated'

const PostCard: React.FC<{ data: Post; OpenComments: () => void }> = ({
  data,
  OpenComments
}) => {
  const theme = useTheme()

  return (
    <Card
      style={{
        borderRadius: 0,
        backgroundColor: theme.colors.background
      }}
      mode="contained"
    >
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          margin: 10
        }}
      >
        <PosterTag authorId={data.authorId} />
      </View>
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
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            icon="comment"
            buttonColor="transparent"
            textColor={theme.colors.secondary}
            style={{
              borderWidth: 0
            }}
            onPress={OpenComments}
          >
            {data._count.comments}
          </Button>

          <Button
            icon="heart"
            buttonColor="transparent"
            textColor={theme.colors.error}
            style={{
              borderWidth: 0,
              margin: 2
            }}
            disabled
          >
            {data._count.likes}
          </Button>
        </View>
      </Card.Actions>
      <Divider />
    </Card>
  )
}

export default PostCard

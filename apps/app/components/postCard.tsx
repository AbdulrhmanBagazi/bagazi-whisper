import { View } from 'react-native'
import { Text, Card, useTheme, Button, Divider } from 'react-native-paper'
import PosterTag from './post/posterTag'
import { Post } from '../graphql/generated'
import { windowWidth } from '../config/config'

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
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
            onPress={() => console.log(1)}
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
            onPress={() => console.log(1)}
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

import { View } from 'react-native'
import { Text, Card, useTheme, Button, Divider } from 'react-native-paper'
import { FeedPosts } from '../../graphql/generated'
import FeedTag from './feedTag'
import LikeButton from '../likeButton'

const FeedCard: React.FC<{ data: FeedPosts; index: number }> = ({
  data,
  index
}) => {
  const theme = useTheme()
  return (
    <Card
      style={{
        borderRadius: 0,
        // marginVertical: 5
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
        <FeedTag data={data} />
      </View>
      <Card.Content>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 50
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

          <LikeButton
            index={index}
            id={data.id}
            liked={data._count.mylikes >= 1}
            likes={data._count.likes}
          />
        </View>
      </Card.Actions>
      <Divider />
    </Card>
  )
}

export default FeedCard

import { View } from 'react-native'
import { Text, Card, useTheme, IconButton } from 'react-native-paper'

const PostCard: React.FC<{ body: string }> = ({ body }) => {
  const theme = useTheme()

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 0
        // margin: 5,
        // borderWidth: 0
        // borderColor: theme.colors.surfaceVariant
      }}
      mode="contained"
    >
      <Card.Content
        style={{
          backgroundColor: theme.colors.background
          // borderTopRightRadius: theme.roundness + 3,
          // borderTopLeftRadius: theme.roundness + 3
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 30
          }}
        >
          <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
            {body}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={{ padding: 0 }}>
        <IconButton
          icon="comment"
          onPress={() => console.log('open comments')}
          iconColor={theme.colors.onSurfaceDisabled}
          size={15}
          style={{ borderWidth: 0 }}
        />
        <IconButton
          icon="heart"
          iconColor={theme.colors.onSurfaceDisabled}
          size={15}
          onPress={() => console.log('like')}
        />
      </Card.Actions>
    </Card>
  )
}

export default PostCard

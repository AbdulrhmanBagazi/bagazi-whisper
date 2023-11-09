import { useCallback, useEffect } from 'react'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useTheme, IconButton, Text } from 'react-native-paper'
import { ActivityIndicator, View } from 'react-native'
import { useI18nHook } from '../../hook/i18n'
import { Comment, useGet_CommentsLazyQuery } from '../../graphql/generated'
import Client from '../../config/api/apollo'
import { useCommentHook } from '../../hook/comment'
import moment from 'moment'
import FeedTag from '../feed/feedTag'

const SheetFlatList: React.FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme()
  const { I18n } = useI18nHook()
  // const { user } = useAuthHook()
  const { CommentLoading, OpenComment, postId, postAuthor } = useCommentHook()
  // Data
  const [getComments, { loading, data }] = useGet_CommentsLazyQuery({
    client: Client
  })

  useEffect(() => {
    if (open && postId && postAuthor) {
      getComments({
        variables: {
          post_id: postId
        },
        onCompleted() {
          return OpenComment()
        }
      })
    }
  }, [open, postId, postAuthor])

  const renderItem = useCallback(
    ({ item }: { item: Comment }) => (
      <View style={{ padding: 10 }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <FeedTag data={item} />
        </View>
        <View style={{ padding: 10 }}>
          <Text variant="bodyMedium">{item.body}</Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <Text
            variant="labelMedium"
            style={{ color: theme.colors.tertiary, writingDirection: 'ltr' }}
          >
            {moment(item.createdAt).fromNow(true).normalize()}
          </Text>
        </View>
      </View>
    ),
    []
  )

  if (CommentLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <BottomSheetFlatList
      data={data?.Get_Comments}
      keyExtractor={(i) => i.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      ListEmptyComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25
          }}
        >
          <IconButton icon="comment" size={30} />
          <Text variant="labelMedium" style={{ color: 'gray' }}>
            {I18n.Home.NoComments}
          </Text>
        </View>
      }
    />
  )
}

export default SheetFlatList

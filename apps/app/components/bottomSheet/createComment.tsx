import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { IconButton, useTheme } from 'react-native-paper'
import { View, I18nManager, Keyboard } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import {
  Create_CommentDocument,
  Create_CommentMutation,
  Create_CommentMutationVariables,
  Get_CommentsDocument
} from '../../graphql/generated'
import { useI18nHook } from '../../hook/i18n'
import { useSnckHook } from '../../hook/snack'
import Client from '../../config/api/apollo'
import { useCommentHook } from '../../hook/comment'
import { Formik } from 'formik'
import * as yup from 'yup'

const CreateComment = () => {
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)
  const { ShowSnack } = useSnckHook((state) => state)
  const { postId } = useCommentHook()
  const initialValues = { body: '' }
  const [Create_CommentMutation, { loading }] = useMutation<
    Create_CommentMutation,
    Create_CommentMutationVariables
  >(Create_CommentDocument, {
    client: Client,
    onError(error) {
      ShowSnack(I18n.Errors.Unknown)
    },
    update(cache, { data }) {
      const { Get_Comments } = Client.readQuery({
        query: Get_CommentsDocument,
        variables: {
          post_id: postId
        }
      })

      cache.writeQuery({
        query: Get_CommentsDocument,
        data: {
          Get_Comments: [...Get_Comments, data?.Create_Comment]
        },
        variables: {
          post_id: postId
        }
      })

      const currentPost = Client.readFragment({
        id: `FeedPosts:${postId}`, // The value of the to-do item's cache ID
        fragment: gql`
          fragment Feed on FeedPosts {
            id
            body
            authorId
            _count {
              likes
              comments
              mylikes
            }
            createdAt
          }
        `
      })

      const currentPostProfile = Client.readFragment({
        id: `Post:${postId}`, // The value of the to-do item's cache ID
        fragment: gql`
          fragment Post on Post {
            id
            body
            authorId
            _count {
              likes
              comments
            }
            createdAt
          }
        `
      })

      if (currentPostProfile) {
        return cache.modify({
          id: cache.identify(currentPostProfile),
          fields: {
            _count(cache) {
              return {
                likes: cache.likes,
                comments: cache.comments + 1,
                mylikes: cache.mylikes
              }
            }
          }
        })
      }

      if (currentPost) {
        return cache.modify({
          id: cache.identify(currentPost),
          fields: {
            _count(cache) {
              return {
                likes: cache.likes,
                comments: cache.comments + 1,
                mylikes: cache.mylikes
              }
            }
          }
        })
      }
    }
  })

  const Validation = yup.object().shape({
    body: yup.string().min(1).required(I18n.Post.Required)
  })

  const HandleComment = async (
    values: { body: string },
    resetForm: (data: any) => void,
    post_id: string
  ) => {
    Keyboard.dismiss()
    const { data } = await Create_CommentMutation({
      variables: {
        post_id: post_id,
        body: values.body
      }
    })

    // if (data?.Create_Post?.__typename === 'Post') {
    //   goBack()

    //   addPost(data.Create_Post)
    //   return ShowSnack(I18n.Post.Created)
    // }

    // if (data?.Create_Post?.__typename === 'UnknownError') {
    //   return ShowSnack(I18n.Errors.Unknown)
    // }

    return resetForm({ values: initialValues })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) =>
        postId ? HandleComment(values, resetForm, postId) : undefined
      }
      validationSchema={Validation}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        // errors,
        // touched,
        isValid
      }) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 1 }}>
            <BottomSheetTextInput
              // editable={!loading}
              style={{
                fontSize: 16,
                lineHeight: 20,
                padding: 8,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(151, 151, 151, 0.25)',
                color: theme.colors.onBackground
              }}
              value={values.body}
              onChangeText={handleChange('body')}
              onBlur={handleBlur('body')}
            />
          </View>
          <View
            style={{
              transform: I18nManager.isRTL ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          >
            <IconButton
              disabled={!isValid || loading || postId == null}
              icon="send"
              size={30}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      )}
    </Formik>
  )
}

export default CreateComment

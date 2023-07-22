import { ScrollView, View } from 'react-native'
import Header from '../../components/header'
import MyButton from '../../components/myButton'
import {
  Appbar,
  HelperText,
  IconButton,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useI18nHook } from '../../hook/i18n'
import { windowHeight } from '../../config/config'
import { useMutation } from '@apollo/client'
import {
  Create_PostDocument,
  Create_PostMutation,
  Create_PostMutationVariables
} from '../../graphql/generated'
import { useSnckHook } from '../../hook/snack'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useProfilePostsHook } from '../../hook/profileposts'

export default function PostScreen() {
  const I18n = useI18nHook((state) => state.I18n)
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const addPost = useProfilePostsHook((state) => state.addPost)
  const { setOptions, goBack } = useNavigation()
  const theme = useTheme()
  const [mutateFunction, { loading }] = useMutation<
    Create_PostMutation,
    Create_PostMutationVariables
  >(Create_PostDocument, {
    onError() {
      ShowSnack(I18n.Errors.Unknown)
    }
  })

  const Validation = yup.object().shape({
    body: yup
      .string()
      .max(280, I18n.Post.max)
      .matches(/^(?!.*[ ]{2,}).*$/, I18n.Post.Spaceerror)
      .required(I18n.Post.Required)
  })

  useEffect(() => {
    return setOptions({
      title: '',
      gestureEnabled: !loading
    })
  }, [setOptions, loading])

  const HandlePost = async (values: { body: string }) => {
    const { data } = await mutateFunction({
      variables: {
        body: values.body
      }
    })

    if (data?.Create_Post?.__typename === 'Post') {
      goBack()

      addPost(data.Create_Post)
      return ShowSnack(I18n.Post.Created)
    }

    if (data?.Create_Post?.__typename === 'UnknownError') {
      return ShowSnack(I18n.Errors.Unknown)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <Appbar.Header style={{ justifyContent: 'flex-end' }}>
        <IconButton
          onPress={() => goBack()}
          icon="close-circle"
          size={30}
          disabled={loading}
        />
      </Appbar.Header>
      <Formik
        initialValues={{
          body: ''
        }}
        onSubmit={(values) => HandlePost(values)}
        validationSchema={Validation}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid
        }) => (
          <View
            style={{ flex: 1, justifyContent: 'center', marginHorizontal: 25 }}
          >
            <View style={{ flex: 2 }}>
              <Text style={{ alignSelf: 'flex-end' }}>
                {values.body.length + '/280'}
              </Text>
              <TextInput
                label={undefined}
                placeholder={I18n.Post.Placeholder}
                value={values.body}
                onChangeText={handleChange('body')}
                onBlur={handleBlur('body')}
                contentStyle={{
                  backgroundColor: theme.colors.background,
                  height: windowHeight / 4
                }}
                multiline
                blurOnSubmit={true}
                numberOfLines={4}
                error={errors.body && touched.body ? true : false}
                disabled={loading}
              />
              <HelperText type="error" style={{ marginVertical: 10 }}>
                {errors.body}
              </HelperText>
            </View>

            <View style={{ marginVertical: 30 }}>
              <MyButton
                disabled={!isValid || loading}
                onPress={() => handleSubmit()}
                style={{ marginTop: 10 }}
              >
                {I18n.Post.Button}
              </MyButton>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}
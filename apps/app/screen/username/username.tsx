import { View } from 'react-native'
import { HelperText, TextInput, useTheme } from 'react-native-paper'
import HeaderLogout from '../../components/headerLogout'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useI18nHook } from '../../hook/i18n'
import MyButton from '../../components/myButton'
import { useMutation } from '@apollo/client/react/hooks/useMutation'
import {
  Add_UsernameDocument,
  Add_UsernameMutation,
  Add_UsernameMutationVariables
} from '../../graphql/generated'
import { useSnckHook } from '../../hook/snack'
import { useAuthHook } from '../../hook/auth'

export default function UsernameScreen() {
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)
  const { ShowSnack } = useSnckHook((state) => state)
  const { AddUsername, AuthLoading } = useAuthHook((state) => state)

  const [mutateFunction, { loading }] = useMutation<
    Add_UsernameMutation,
    Add_UsernameMutationVariables
  >(Add_UsernameDocument, {
    onError() {
      ShowSnack(I18n.Errors.Unknown)
    }
  })

  const Validation = yup.object().shape({
    username: yup
      .string()
      .matches(/^[A-Za-z0-9_]{4,15}$/, I18n.Username.UsernameCheck)
      .required(I18n.Username.Required)
  })

  const HandleLogin = async (values: { username: string }) => {
    const { data } = await mutateFunction({
      variables: {
        username: values.username
      }
    })

    if (data?.Add_Username?.__typename === 'NotAllowedError') {
      return ShowSnack(I18n.Username.UsernameUsed)
    }

    if (data?.Add_Username?.__typename === 'Username') {
      return AddUsername(data?.Add_Username.username)
    }
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <HeaderLogout />
      <Formik
        initialValues={{
          username: ''
        }}
        onSubmit={(values) => HandleLogin(values)}
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
              <TextInput
                style={{
                  textAlign: 'left',
                  direction: 'ltr'
                }}
                label={I18n.Username.Username}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                mode="flat"
                contentStyle={{
                  backgroundColor: theme.colors.background
                }}
                error={errors.username && touched.username ? true : false}
                disabled={loading || AuthLoading}
                left={<TextInput.Affix text="@" />}
              />
              <HelperText type="error" style={{ marginVertical: 10 }}>
                {errors.username}
              </HelperText>
            </View>

            <View style={{ marginVertical: 30 }}>
              <MyButton
                disabled={!isValid || loading || AuthLoading}
                onPress={() => handleSubmit()}
                style={{ marginTop: 10 }}
              >
                {I18n.Username.Continue}
              </MyButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

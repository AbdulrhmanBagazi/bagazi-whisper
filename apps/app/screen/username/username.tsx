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
  const I18n = useI18nHook((state) => state.I18n)
  const Direction = useI18nHook((state) => state.Direction)
  const theme = useTheme()
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const AddUsername = useAuthHook((state) => state.AddUsername)
  const AuthLoading = useAuthHook((state) => state.loading)

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
      .matches(/^[0-9]{2}$/, 'Must be exactly 2 digits')
      .required('Required!')
  })

  const HandleLogin = async (values: { username: string }) => {
    const { data } = await mutateFunction({
      variables: {
        username: values.username
      }
    })
    console.log(data?.Add_Username)

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
            style={{ flex: 1, justifyContent: 'center', marginHorizontal: 50 }}
          >
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                style={{
                  textAlign: Direction === 'rtl' ? 'right' : 'left'
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
              <HelperText type="error">{errors.username}</HelperText>
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

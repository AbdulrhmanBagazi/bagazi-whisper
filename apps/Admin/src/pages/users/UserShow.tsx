import { Show, SimpleShowLayout } from 'react-admin'
import UserFields from './UserFields'
import Field from '../../layout/Fileds'

const UserShow = () => {
  return (
    <Show emptyWhileLoading>
      <SimpleShowLayout>
        {UserFields.map((field, i) => {
          return <Field source={field.source} field={field.field} key={i} />
        })}
      </SimpleShowLayout>
    </Show>
  )
}

export default UserShow

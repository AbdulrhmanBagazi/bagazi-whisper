import { Datagrid, List } from 'react-admin'
import Field from '../../layout/Fileds'
import UserFields from './UserFields'

const UserList = () => {
  return (
    <List perPage={10} emptyWhileLoading exporter={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        {UserFields.map((field, i) => {
          return <Field source={field.source} field={field.field} key={i} />
        })}
      </Datagrid>
    </List>
  )
}

export default UserList

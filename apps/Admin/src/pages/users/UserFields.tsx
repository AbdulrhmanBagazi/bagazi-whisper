import { FieldsObject } from '../../layout/Fileds'

const UserFields: FieldsObject = [
  {
    source: 'email',
    field: 'EmailField'
  },
  {
    source: 'username',
    field: 'TextField'
  },
  {
    source: 'google',
    field: 'BooleanField'
  },
  {
    source: 'apple',
    field: 'BooleanField'
  },
  {
    source: 'verfied',
    field: 'BooleanField'
  },
  {
    source: 'suspended',
    field: 'BooleanField'
  },
  {
    source: 'createdAt',
    field: 'DateField'
  },
  
]

export default UserFields

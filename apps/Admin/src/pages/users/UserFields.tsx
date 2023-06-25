import { FieldsObject } from '../../layout/Fileds'

const UserFields: FieldsObject = [
  // {
  //   source: 'id',
  //   field: 'TextField'
  // },
  {
    source: 'email',
    field: 'EmailField'
  },
  {
    source: 'type',
    field: 'ChipField'
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
  }
]

export default UserFields

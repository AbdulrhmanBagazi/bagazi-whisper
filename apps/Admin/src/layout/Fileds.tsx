import {
  BooleanField,
  ChipField,
  DateField,
  EmailField,
  TextField
} from 'react-admin'

export type Fields =
  | 'TextField'
  | 'EmailField'
  | 'BooleanField'
  | 'DateField'
  | 'ChipField'
export type FieldsObject = {
  source: string
  field: Fields
}[]

const Field: React.FC<{
  source: string
  field: Fields
}> = ({ source, field }) => {
  if (field === 'EmailField') return <EmailField source={source} />

  if (field === 'BooleanField') return <BooleanField source={source} />

  if (field === 'DateField') return <DateField source={source} />

  if (field === 'ChipField') return <ChipField source={source} />

  return <TextField source={source} />
}

export default Field

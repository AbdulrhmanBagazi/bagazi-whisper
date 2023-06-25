import {
  BooleanInput,
  Edit,
  SaveButton,
  SimpleForm,
  Toolbar
} from 'react-admin'

const CustomToolBar = () => (
  <Toolbar>
    <SaveButton label="Save" />
  </Toolbar>
)

const UserEdit = () => {
  return (
    <Edit mutationMode="pessimistic" redirect="show">
      <SimpleForm toolbar={<CustomToolBar />}>
        <BooleanInput source="suspended" />
      </SimpleForm>
    </Edit>
  )
}

export default UserEdit

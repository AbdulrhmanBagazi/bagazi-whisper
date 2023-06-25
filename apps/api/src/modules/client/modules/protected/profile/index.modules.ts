import {
  Create_Profile_Mutation,
  Create_Profile_TypeDefs
} from './create.profile'
import {
  Update_Profile_Mutation,
  Update_Profile_TypeDefs
} from './update.profile'

// const Query = {  };

const Mutation = {
  ...Create_Profile_Mutation,
  ...Update_Profile_Mutation
}

// const Resolver = {  };

const typeDef = [Create_Profile_TypeDefs, Update_Profile_TypeDefs]

export const Profile = {
  // Query,
  Mutation,
  // Resolver,
  typeDef
}

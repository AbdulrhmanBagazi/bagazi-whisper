import {
  getOne_Users_TypeDefs,
  getOne_Users_Query
} from './getOne/getOne.users'
import { list_Users_TypeDefs, list_Users_Query } from './list/list.users'
import {
  Update_Users_TypeDefs,
  Update_Users_Mutation
} from './update/update.users'

const Query = { ...list_Users_Query, ...getOne_Users_Query }

const Mutation = { ...Update_Users_Mutation }

// const Resolver = {  };

const typeDef = [
  list_Users_TypeDefs,
  getOne_Users_TypeDefs,
  Update_Users_TypeDefs
]

export const Users = {
  Query,
  Mutation,
  // Resolver,
  typeDef
}

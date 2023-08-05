import { Friend_Mutation, Friend_TypeDefs } from './friend'
import {
  Friend_Request_Query,
  Send_Friend_Request_Mutation,
  Send_Friend_Request_TypeDefs
} from './request'
import { Seach_Friend_Mutation, Seach_Friend_TypeDefs } from './search'

const Query = {
  ...Friend_Request_Query
}

const Mutation = {
  ...Friend_Mutation,
  ...Seach_Friend_Mutation,
  ...Send_Friend_Request_Mutation
}

// const Resolver = {  };

const typeDef = [
  Friend_TypeDefs,
  Seach_Friend_TypeDefs,
  Send_Friend_Request_TypeDefs
]

export const Friend = {
  Query,
  Mutation,
  // Resolver,
  typeDef
}

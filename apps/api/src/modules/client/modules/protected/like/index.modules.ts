import { Like_Mutation, Like_TypeDefs } from './like'

// const Query = {}

const Mutation = {
  ...Like_Mutation
}

// const Resolver = {  };

const typeDef = [Like_TypeDefs]

export const Like = {
  // Query,
  Mutation,
  // Resolver,
  typeDef
}

import { Friend_Mutation, Friend_TypeDefs } from './friend'

// const Query = {  };

const Mutation = {
  ...Friend_Mutation
}

// const Resolver = {  };

const typeDef = [Friend_TypeDefs]

export const Friend = {
  // Query,
  Mutation,
  // Resolver,
  typeDef
}

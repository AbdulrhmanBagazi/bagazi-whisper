import { Username_Mutation, Username_TypeDefs } from './username'

// const Query = {  };

const Mutation = {
  ...Username_Mutation
}

// const Resolver = {  };

const typeDef = [Username_TypeDefs]

export const Username = {
  // Query,
  Mutation,
  // Resolver,
  typeDef
}

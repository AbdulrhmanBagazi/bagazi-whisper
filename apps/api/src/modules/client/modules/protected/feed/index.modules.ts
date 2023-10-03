import { Feed_TypeDefs, Feed_Query } from './feed'

const Query = {
  ...Feed_Query
}

// const Mutation = {

// }

// const Resolver = {  };

const typeDef = [Feed_TypeDefs]

export const Feed = {
  Query,
  //   Mutation,
  // Resolver,
  typeDef
}

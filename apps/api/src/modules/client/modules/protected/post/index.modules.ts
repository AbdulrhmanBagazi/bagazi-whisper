import { Post_Query, Post_TypeDefs } from './post'

const Query = {
  ...Post_Query
}

// const Mutation = {
// }

// const Resolver = {  };

const typeDef = [Post_TypeDefs]

export const Post = {
  Query,
  //   Mutation,
  // Resolver,
  typeDef
}

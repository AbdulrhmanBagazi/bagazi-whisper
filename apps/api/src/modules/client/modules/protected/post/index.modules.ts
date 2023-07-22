import { Post_Query, Post_Mutation, Post_TypeDefs } from './post'

const Query = {
  ...Post_Query
}

const Mutation = {
  ...Post_Mutation
}

// const Resolver = {  };

const typeDef = [Post_TypeDefs]

export const Post = {
  Query,
  Mutation,
  // Resolver,
  typeDef
}

import { Comment_Mutation, Comment_Query, Comment_TypeDefs } from './comments'

const Query = {
  ...Comment_Query
}

const Mutation = {
  ...Comment_Mutation
}

// const Resolver = {  };

const typeDef = [Comment_TypeDefs]

export const Comments = {
  Query,
  Mutation,
  //   Resolver,
  typeDef
}

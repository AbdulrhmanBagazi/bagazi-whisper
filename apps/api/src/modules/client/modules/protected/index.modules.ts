import { Friend } from './friend/index.modules'
import { Post } from './post/index.modules'
import { Username } from './username/index.modules'

export const ClientResolvers = {
  Query: {
    ...Post.Query
  },
  Mutation: {
    ...Friend.Mutation,
    ...Username.Mutation
  }
  // ...Posts.Resolver,
}
export const ClientTypeDefs = [Friend.typeDef, Username.typeDef, Post.typeDef]

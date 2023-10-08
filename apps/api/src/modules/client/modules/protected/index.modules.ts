import { Feed } from './feed/index.modules'
import { Friend } from './friend/index.modules'
import { Like } from './like/index.modules'
import { Post } from './post/index.modules'
import { Username } from './username/index.modules'

export const ClientResolvers = {
  Query: {
    ...Post.Query,
    ...Friend.Query,
    ...Feed.Query
  },
  Mutation: {
    ...Friend.Mutation,
    ...Username.Mutation,
    ...Post.Mutation,
    ...Like.Mutation
  }
  // ...Posts.Resolver,
}
export const ClientTypeDefs = [
  Friend.typeDef,
  Username.typeDef,
  Post.typeDef,
  Feed.typeDef,
  Like.typeDef
]

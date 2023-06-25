import { Users } from './modules/users/index.modules'

export const AdminResolvers = {
  Query: {
    ...Users.Query
  },
  Mutation: {
    ...Users.Mutation
  }
  // ...Users.Resolver,
  // ...Dashboard.Resolver,
  // ...Applicants.Resolver,
}

export const AdminTypeDefs = [Users.typeDef]

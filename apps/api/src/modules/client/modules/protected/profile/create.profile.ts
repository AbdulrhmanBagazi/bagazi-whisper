import { MyContext } from '../../../../../context'
import { UserProfile } from './types'
import gql from 'graphql-tag'

export const Create_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Create_UserProfile(name: String!, age: String!, gender: String!): Profile
  }

  type Profile {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    name: String
    age: String
    gender: String
  }

  scalar DateTime
  scalar JSON
`

export const Create_Profile_Mutation = {
  Create_UserProfile: async (
    _parent: any,
    args: UserProfile,
    context: MyContext
  ) => {
    const CreateProfile = await context.prisma.profile.create({
      data: {
        userId: context.req.user.id,
        name: args.name,
        age: args.age,
        gender: args.gender
      }
    })

    return CreateProfile
  }
}

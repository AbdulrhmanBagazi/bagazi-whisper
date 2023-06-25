import { MyContext } from '../../../../../context'
import { UserProfile } from './types'
import gql from 'graphql-tag'

export const Update_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Update_UserProfile(name: String!, age: String!, gender: String!): Profile
  }

  scalar JSON
`

export const Update_Profile_Mutation = {
  Update_UserProfile: async (
    _parent: any,
    args: UserProfile,
    context: MyContext
  ) => {
    const CreateProfile = await context.prisma.profile.update({
      data: {
        name: args.name,
        age: args.age,
        gender: args.gender
      },
      where: {
        userId: context.req.user.id
      }
    })

    return CreateProfile
  }
}

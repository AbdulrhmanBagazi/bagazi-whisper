import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

type Add_Remove_Friend = {
  FreindId: string
}

export const Friend_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Add_Friend(FreindId: String!): Boolean
    Remove_Friend(userIdA: String!, userIdB: String!): Boolean
  }
`

export const Friend_Mutation = {
  Add_Friend: async (
    _parent: any,
    args: Add_Remove_Friend,
    context: MyContext
  ) => {
    try {
      const updateUser = await context.prisma.user.update({
        where: { id: context.req.user.id },
        data: { friends: { connect: [{ id: args.FreindId }] } }
      })

      await context.prisma.user.update({
        where: { id: args.FreindId },
        data: { friends: { connect: [{ id: context.req.user.id }] } }
      })

      return updateUser
    } catch (e) {
      return false
    }
  },
  Remove_Friend: async (
    _parent: any,
    args: Add_Remove_Friend,
    context: MyContext
  ) => {
    try {
      await context.prisma.user.update({
        where: { id: context.req.user.id },
        data: { friends: { disconnect: [{ id: args.FreindId }] } }
      })

      await context.prisma.user.update({
        where: { id: args.FreindId },
        data: { friends: { disconnect: [{ id: context.req.user.id }] } }
      })

      return true
    } catch (e) {
      return false
    }
  }
}

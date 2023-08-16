import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

type Add_Remove_Friend = {
  FriendId: string
  RequestId: string
}

export const Friend_TypeDefs = gql`
  type Friend {
    id: String!
    username: String!
  }

  type myFriends {
    friends: [Friend!]!
  }

  type Query {
    Get_Friends: myFriends!
  }

  type Mutation {
    Add_Friend(FriendId: String!, RequestId: String!): Boolean
    Remove_Friend(FriendId: String!): Boolean
    Decline_Friend(RequestId: String!): Boolean
  }
`

export const Friend_Query = {
  Get_Friends: async (_parent: any, _args: any, context: MyContext) => {
    const data = await context.prisma.user.findUnique({
      where: {
        id: context.req.user.id
      },
      select: {
        friends: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })

    return data
  }
}

export const Friend_Mutation = {
  Add_Friend: async (
    _parent: any,
    args: Add_Remove_Friend,
    context: MyContext
  ) => {
    try {
      await context.prisma.user.update({
        where: { id: context.req.user.id },
        data: {
          friends: { connect: [{ id: args.FriendId }] }
        }
      })

      await context.prisma.user.update({
        where: { id: args.FriendId },
        data: {
          friends: {
            connect: [
              {
                id: context.req.user.id
              }
            ]
          }
        }
      })

      await context.prisma.request.update({
        where: { id: args.RequestId },
        data: {
          status: 'ACCEPTED'
        }
      })

      return true
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
      const getRequest = await context.prisma.request.findFirst({
        where: {
          OR: [
            {
              senderId: context.req.user.id,
              reciverId: args.FriendId
            },
            {
              senderId: args.FriendId,
              reciverId: context.req.user.id
            }
          ]
        }
      })

      await context.prisma.request.update({
        where: {
          id: getRequest?.id
        },
        data: {
          status: 'REMOVED'
        }
      })

      await context.prisma.user.update({
        where: { id: context.req.user.id },
        data: { friends: { disconnect: [{ id: args.FriendId }] } }
      })

      await context.prisma.user.update({
        where: { id: args.FriendId },
        data: { friends: { disconnect: [{ id: context.req.user.id }] } }
      })

      return true
    } catch (e) {
      return false
    }
  },
  Decline_Friend: async (
    _parent: any,
    args: Add_Remove_Friend,
    context: MyContext
  ) => {
    try {
      await context.prisma.request.update({
        where: { id: args.RequestId },
        data: {
          status: 'DECLINED'
        }
      })
      return true
    } catch (e) {
      return false
    }
  }
}

import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

type Send_Request = {
  FriendId: string
}

export const Send_Friend_Request_TypeDefs = gql`
  type Users {
    id: String!
    username: String!
  }

  type Request_Status {
    Status: Boolean
  }

  type Sender {
    username: String!
  }
  type Requests {
    id: String!
    sender: Sender!
  }

  union Send_Friend_Request_Result = Request_Status | UnknownError

  type Query {
    Get_Friend_Request: [Requests!]!
  }

  type Mutation {
    Send_Friend_Request(FriendId: String!): Send_Friend_Request_Result
  }
`

export const Friend_Request_Query = {
  Get_Friend_Request: async (_parent: any, _args: any, context: MyContext) => {
    const requests = await context.prisma.request.findMany({
      where: {
        reciverId: context.req.user.id,
        status: 'PENDING'
      },
      select: {
        id: true,
        sender: {
          select: {
            username: true
          }
        }
      }
    })

    return requests
  }
}

export const Send_Friend_Request_Mutation = {
  Send_Friend_Request: async (
    _parent: any,
    args: Send_Request,
    context: MyContext
  ) => {
    try {
      await context.prisma.request.create({
        data: {
          senderId: context.req.user.id,
          reciverId: args.FriendId
        }
      })
      return {
        __typename: 'Request_Status',
        Status: true
      }
    } catch (e) {
      return {
        __typename: 'UnknownError',
        error: 'Error'
      }
    }
  }
}

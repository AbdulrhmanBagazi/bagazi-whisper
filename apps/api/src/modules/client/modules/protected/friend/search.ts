import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

type Seach_Friend = {
  Keyword: string
}

export const Seach_Friend_TypeDefs = gql`
  type Query {
    test: String
  }

  type Users {
    id: String!
    username: String!
  }

  type Seach_Users {
    Seach_Users: [Users!]!
  }

  union Seach_Friend_Result = Seach_Users | UnknownError

  type Mutation {
    Seach_Friend(Keyword: String!): Seach_Friend_Result
  }
`

export const Seach_Friend_Mutation = {
  Seach_Friend: async (
    _parent: any,
    args: Seach_Friend,
    context: MyContext
  ) => {
    try {
      const users = await context.prisma.user.findMany({
        where: {
          username: {
            startsWith: args.Keyword,
            mode: 'insensitive'
          },
          id: { not: context.req.user.id },
          NOT: {
            OR: [
              {
                friendRequest: {
                  some: {
                    senderId: context.req.user.id,
                    status: { in: ['PENDING', 'CANCELED', 'ACCEPTED'] }
                  }
                }
              },
              {
                requestSent: {
                  some: {
                    reciverId: context.req.user.id,
                    status: { in: ['PENDING', 'CANCELED', 'ACCEPTED'] }
                  }
                }
              }
            ]
          }
        },
        select: {
          id: true,
          username: true
        }
      })

      return {
        __typename: 'Seach_Users',
        Seach_Users: users
      }
    } catch (e) {
      return {
        __typename: 'UnknownError',
        error: 'Error'
      }
    }
  }
}

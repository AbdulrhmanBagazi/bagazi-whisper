import { Prisma } from '@prisma/client'
import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Username_TypeDefs = gql`
  type UnknownError {
    error: String!
  }

  type NotAllowedError {
    error: String!
  }

  type Username {
    username: String!
  }

  union Add_Username_Result = Username | UnknownError | NotAllowedError

  type Mutation {
    Add_Username(username: String!): Add_Username_Result
  }
`

export const Username_Mutation = {
  Add_Username: async (
    _parent: any,
    args: {
      username: string
    },
    context: MyContext
  ) => {
    try {
      const getUsername = await context.prisma.user.update({
        where: { id: context.req.user.id },
        data: {
          username: args.username
        }
      })

      if (getUsername.username) {
        return {
          __typename: 'Username',
          username: getUsername.username
        }
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          return {
            __typename: 'NotAllowedError',
            error: 'Unique'
          }
        }
      }
      return {
        __typename: 'UnknownError',
        error: 'Error'
      }
    }
  }
}

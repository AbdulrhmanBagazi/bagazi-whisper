import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Like_TypeDefs = gql`
  enum CD {
    connect
    disconnect
  }

  type Mutation {
    Like(id: String!, type: CD!): Boolean
  }
`

type CD = 'connect' | 'disconnect'

export const Like_Mutation = {
  Like: async (
    _parent: any,
    args: { id: string; type: CD },
    context: MyContext
  ) => {
    try {
      await context.prisma.post.update({
        data: {
          likes: {
            [args.type]: [
              {
                id: context.req.user.id
              }
            ]
          }
        },
        where: {
          id: args.id
        }
      })

      return true
    } catch (error) {
      return false
    }
  }
}

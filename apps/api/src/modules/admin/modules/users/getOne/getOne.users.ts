import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const getOne_Users_TypeDefs = gql`
  type Query {
    User(id: String!): User
  }
`

export const getOne_Users_Query = {
  User: (_parent: any, args: { id: string }, context: MyContext) => {
    return context.prisma.user.findUnique({
      where: {
        id: args.id
      },
      select: {
        email: true,
        id: true,
        verfied: true,
        suspended: true,
        createdAt: true,
        type: true,
        Profile: true
      }
    })
  }
}

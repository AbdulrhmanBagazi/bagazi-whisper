import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Update_Users_TypeDefs = gql`
  type Mutation {
    update_User(id: String!, data: update_User): User
  }

  input update_User {
    suspended: Boolean!
  }
`

export const Update_Users_Mutation = {
  update_User: async (
    _parent: any,
    args: { id: string; data: { suspended: boolean } },
    context: MyContext
  ) => {
    const updateUser = await context.prisma.user.update({
      where: {
        id: args.id
      },
      data: {
        suspended: args.data.suspended
      }
    })

    return updateUser
  }
}

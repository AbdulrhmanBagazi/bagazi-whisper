import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Like_TypeDefs = gql`
  enum CD {
    connect
    disconnect
  }

  type Mutation {
    Like(id: String!, type: CD!): FeedPosts
  }
`

type CD = 'connect' | 'disconnect'

export const Like_Mutation = {
  Like: async (
    _parent: any,
    args: { id: string; type: CD },
    context: MyContext
  ) => {
    const data = await context.prisma.post.update({
      data: {
        likes: {
          [args.type]: [
            {
              id: context.req.user.id
            }
          ]
        },
        mylikes: {
          [args.type]: [
            {
              id: context.req.user.id
            }
          ]
        }
      },
      where: {
        id: args.id
      },
      select: {
        id: true,
        body: true,
        authorId: true,
        _count: {
          select: {
            likes: true,
            comments: true,
            mylikes: {
              where: {
                id: context.req.user.id
              }
            }
          }
        },
        createdAt: true
        // likes: {
        //   where: {
        //     id: context.req.user.id
        //   },
        //   select: {
        //     id: true
        //   }
        // }
      }
    })

    return data
  }
}

import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Post_TypeDefs = gql`
  type PostCount {
    likes: Int
  }

  type Post {
    id: String!
    body: String!
    _count: PostCount
  }

  type PostMeta {
    count: Int!
  }

  type Query {
    Get_Post: [Post!]!
    Get_Post_Meta: PostMeta
  }
`

export const Post_Query = {
  Get_Post: async (_parent: any, _args: any, context: MyContext) => {
    const data = await context.prisma.post.findMany({
      where: {
        authorId: context.req.user.id
      },
      select: {
        id: true,
        body: true,
        _count: {
          select: {
            likes: true
          }
        }
      },
      take: 5
    })

    return data
  },
  Get_Post_Meta: async (_parent: any, _args: any, context: MyContext) => {
    const cal = await context.prisma.post.aggregate({
      where: {
        authorId: context.req.user.id
      },
      _count: {
        id: true
      }
    })

    const count = cal._count.id

    return { count }
  }
}

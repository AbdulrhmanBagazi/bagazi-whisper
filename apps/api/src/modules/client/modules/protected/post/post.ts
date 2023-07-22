import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Post_TypeDefs = gql`
  type PostCount {
    likes: Int!
  }

  type Post {
    id: String!
    body: String!
    authorId: String!
    _count: PostCount!
  }

  type PostMeta {
    count: Int!
  }

  type UnknownError {
    error: String!
  }

  type Query {
    Get_Post: [Post!]!
    Get_Post_Meta: PostMeta!
    Get_More_Post(cursor: String!): [Post!]!
  }

  union Create_Post_Result = Post | UnknownError

  type Mutation {
    Create_Post(body: String!): Create_Post_Result
  }
`

export const Post_Query = {
  Get_Post: async (_parent: any, _args: any, context: MyContext) => {
    const data = await context.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        authorId: context.req.user.id
      },
      select: {
        id: true,
        body: true,
        authorId: true,
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
  },
  Get_More_Post: async (
    _parent: any,
    args: { cursor: string },
    context: MyContext
  ) => {
    const data = await context.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        authorId: context.req.user.id
      },
      select: {
        id: true,
        body: true,
        authorId: true,
        _count: {
          select: {
            likes: true
          }
        }
      },
      take: 5,
      skip: 1, // skip cursor
      cursor: {
        id: args.cursor
      }
    })

    return data
  }
}

export const Post_Mutation = {
  Create_Post: async (
    _parent: any,
    args: {
      body: string
    },
    context: MyContext
  ) => {
    try {
      const post = await context.prisma.post.create({
        data: {
          body: args.body,
          authorId: context.req.user.id
        },
        select: {
          id: true,
          body: true,
          authorId: true,
          _count: {
            select: {
              likes: true
            }
          }
        }
      })

      if (post) {
        return {
          __typename: 'Post',
          ...post
        }
      }
    } catch (e) {
      return {
        __typename: 'UnknownError',
        error: 'Error'
      }
    }
  }
}

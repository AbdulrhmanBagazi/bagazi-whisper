import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Post_TypeDefs = gql`
  type PostCount {
    likes: Int!
    comments: Int!
  }

  enum postsRequest {
    inital
    more
  }

  type Post {
    id: String!
    body: String!
    authorId: String!
    _count: PostCount!
    createdAt: String!
  }

  # type PostMeta {
  #   count: Int!
  # }

  type UnknownError {
    error: String!
  }

  type Query {
    Post(cursor: String, type: postsRequest!): [Post!]!
  }

  union Create_Post_Result = Post | UnknownError

  type Mutation {
    Create_Post(body: String!): Create_Post_Result
  }
`

type postsRequest = 'inital' | 'more'

export const Post_Query = {
  Post: async (
    _parent: any,
    args: { cursor: string; type: postsRequest },
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
        createdAt: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      take: 10,
      skip: args.type === 'inital' ? 0 : 1,
      cursor: args.cursor
        ? {
            id: args.cursor
          }
        : undefined
    })

    return data
  }
  // Get_Post: async (_parent: any, _args: undefined, context: MyContext) => {
  //   const data = await context.prisma.post.findMany({
  //     orderBy: {
  //       createdAt: 'desc'
  //     },
  //     where: {
  //       authorId: context.req.user.id
  //     },
  //     select: {
  //       id: true,
  //       body: true,
  //       authorId: true,
  //       createdAt: true,
  //       _count: {
  //         select: {
  //           likes: true,
  //           comments: true
  //         }
  //       }
  //     },
  //     take: 10
  //   })

  //   return data
  // },
  // Get_Post_Meta: async (_parent: any, _args: any, context: MyContext) => {
  //   const calboth = await context.prisma.post.count({
  //     where: {
  //       authorId: context.req.user.id
  //     },
  //     select: {
  //       _all: true
  //     }
  //   })

  //   const count = calboth._all

  //   return { count }
  // },
  // Get_More_Post: async (
  //   _parent: any,
  //   args: { cursor: string },
  //   context: MyContext
  // ) => {
  //   const data = await context.prisma.post.findMany({
  //     orderBy: {
  //       createdAt: 'desc'
  //     },
  //     where: {
  //       authorId: context.req.user.id
  //     },
  //     select: {
  //       id: true,
  //       body: true,
  //       authorId: true,
  //       createdAt: true,
  //       _count: {
  //         select: {
  //           likes: true,
  //           comments: true
  //         }
  //       }
  //     },
  //     take: 10,
  //     skip: 1, // skip cursor
  //     cursor: {
  //       id: args.cursor
  //     }
  //   })

  //   return data
  // }
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
          createdAt: true,
          _count: {
            select: {
              likes: true,
              comments: true
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

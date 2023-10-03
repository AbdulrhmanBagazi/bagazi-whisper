import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Feed_TypeDefs = gql`
  type FeedPostCount {
    likes: Int!
    comments: Int!
  }

  type Author {
    username: String!
  }

  type FeedPosts {
    id: String!
    body: String!
    author: Author!
    _count: FeedPostCount!
  }

  type FeedMeta {
    count: Int!
  }

  type Query {
    Feed_Inital: [FeedPosts!]!
    Feed_Meta: FeedMeta!
  }
`

const ID = 'ef6f67fd-6bea-47ac-8f66-f5becedf41a8'

export const Feed_Query = {
  Feed_Inital: async (_parent: any, _args: any, context: MyContext) => {
    const data = await context.prisma.post.findMany({
      where: {
        OR: [
          // User posts
          // {
          //   author: {
          //     // id: context.req.user.id
          //     id: ID
          //   }
          // },
          // User Friends posts
          {
            author: {
              friends: {
                some: {
                  // id: context.req.user.id
                  id: ID
                }
              }
            }
          },
          // Liked posts from Friends
          {
            likes: {
              some: {
                friends: {
                  some: {
                    // id: context.req.user.id
                    id: ID
                  }
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        body: true,
        author: {
          select: {
            username: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    // console.log(data)

    return data
  },
  Feed_Meta: async (_parent: any, _args: any, context: MyContext) => {
    const cal = await context.prisma.post.aggregate({
      where: {
        OR: [
          // User posts
          // {
          //   author: {
          //     // id: context.req.user.id
          //     id: ID
          //   }
          // },
          // User Friends posts
          {
            author: {
              friends: {
                some: {
                  // id: context.req.user.id
                  id: ID
                }
              }
            }
          },
          // Liked posts from Friends
          {
            likes: {
              some: {
                friends: {
                  some: {
                    // id: context.req.user.id
                    id: ID
                  }
                }
              }
            }
          }
        ]
      },
      _count: {
        id: true
      }
    })

    const count = cal._count.id

    return { count }
  }
}

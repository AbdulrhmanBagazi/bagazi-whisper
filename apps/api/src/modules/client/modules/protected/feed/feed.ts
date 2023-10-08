import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Feed_TypeDefs = gql`
  type FeedPostCount {
    likes: Int!
    comments: Int!
  }

  type mylikes {
    id: String!
  }

  type FeedPosts {
    id: String!
    body: String!
    authorId: String!
    _count: FeedPostCount!
    #
    likes: [mylikes!]!
    createdAt: String!
  }

  type FeedMeta {
    count: Int!
  }

  enum feedRequest {
    inital
    new
    more
  }

  type Query {
    Feed(cursor: String, type: feedRequest!): [FeedPosts!]!
    # Feed_Inital: [FeedPosts!]!
    # Feed_Meta: FeedMeta!
    # Get_More_Feed(cursor: String!): [FeedPosts!]!
    # Get_More_New_Feed(cursor: String!): [FeedPosts!]!
  }
`

type feedRequest = 'inital' | 'new'

export const Feed_Query = {
  Feed: async (
    _parent: any,
    args: { cursor: string; type: feedRequest },
    context: MyContext
  ) => {
    const data = await context.prisma.post.findMany({
      where: {
        OR: [
          // User Friends posts
          {
            author: {
              friends: {
                some: {
                  id: context.req.user.id
                }
              }
            }
          },
          // Liked posts from Friends
          {
            AND: [
              {
                likes: {
                  some: {
                    friends: {
                      some: {
                        id: context.req.user.id
                      }
                    }
                  }
                }
              },
              {
                NOT: {
                  authorId: context.req.user.id
                }
              }
            ]
          }
        ]
      },
      select: {
        id: true,
        body: true,
        authorId: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        },
        createdAt: true,
        likes: {
          where: {
            id: context.req.user.id
          },
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: args.type === 'new' ? -10 : 10,
      skip: args.type === 'inital' ? 0 : 1,
      cursor: args.cursor
        ? {
            id: args.cursor
          }
        : undefined
    })

    return data
  }
  // Feed_Inital: async (_parent: any, _args: undefined, context: MyContext) => {
  //   const data = await context.prisma.post.findMany({
  //     where: {
  //       OR: [
  //         // User posts
  //         // {
  //         //   author: {
  //         //     // id: context.req.user.id
  //         //     id: ID
  //         //   }
  //         // },
  //         // User Friends posts
  //         {
  //           author: {
  //             friends: {
  //               some: {
  //                 id: context.req.user.id
  //                 // id: ID
  //               }
  //             }
  //           }
  //         },
  //         // Liked posts from Friends
  //         {
  //           AND: [
  //             {
  //               likes: {
  //                 some: {
  //                   friends: {
  //                     some: {
  //                       id: context.req.user.id
  //                       // id: ID
  //                     }
  //                   }
  //                 }
  //               }
  //             },
  //             {
  //               NOT: {
  //                 authorId: context.req.user.id
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     select: {
  //       id: true,
  //       body: true,
  //       authorId: true,
  //       _count: {
  //         select: {
  //           likes: true,
  //           comments: true
  //         }
  //       },
  //       createdAt: true,
  //       likes: {
  //         where: {
  //           id: context.req.user.id
  //         },
  //         select: {
  //           id: true
  //         }
  //       }
  //     },
  //     orderBy: {
  //       createdAt: 'desc'
  //     },
  //     take: 10
  //   })

  //   return data
  // },
  // Feed_Meta: async (_parent: any, _args: any, context: MyContext) => {
  //   const cal = await context.prisma.post.aggregate({
  //     where: {
  //       OR: [
  //         // User posts
  //         // {
  //         //   author: {
  //         //     // id: context.req.user.id
  //         //     id: ID
  //         //   }
  //         // },
  //         // User Friends posts
  //         {
  //           author: {
  //             friends: {
  //               some: {
  //                 id: context.req.user.id
  //               }
  //             }
  //           }
  //         },
  //         // Liked posts from Friends
  //         {
  //           likes: {
  //             some: {
  //               friends: {
  //                 some: {
  //                   id: context.req.user.id
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     _count: {
  //       id: true
  //     }
  //   })

  //   const count = cal._count.id

  //   return { count }
  // },
  // Get_More_New_Feed: async (
  //   _parent: any,
  //   args: { cursor: string },
  //   context: MyContext
  // ) => {
  //   const data = await context.prisma.post.findMany({
  //     where: {
  //       OR: [
  //         // User posts
  //         // {
  //         //   author: {
  //         //     // id: context.req.user.id
  //         //     id: ID
  //         //   }
  //         // },
  //         // User Friends posts
  //         {
  //           author: {
  //             friends: {
  //               some: {
  //                 id: context.req.user.id
  //               }
  //             }
  //           }
  //         },
  //         // Liked posts from Friends
  //         {
  //           likes: {
  //             some: {
  //               friends: {
  //                 some: {
  //                   id: context.req.user.id
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     select: {
  //       id: true,
  //       body: true,
  //       authorId: true,
  //       _count: {
  //         select: {
  //           likes: true,
  //           comments: true
  //         }
  //       },
  //       createdAt: true,
  //       likes: {
  //         where: {
  //           id: context.req.user.id
  //         },
  //         select: {
  //           id: true
  //         }
  //       }
  //     },
  //     orderBy: {
  //       createdAt: 'desc'
  //     },
  //     take: -10,
  //     skip: 1, // skip cursor
  //     cursor: {
  //       id: args.cursor
  //     }
  //   })

  //   return data
  // },
  // Get_More_Feed: async (
  //   _parent: any,
  //   args: { cursor: string },
  //   context: MyContext
  // ) => {
  //   const data = await context.prisma.post.findMany({
  //     where: {
  //       OR: [
  //         // User posts
  //         // {
  //         //   author: {
  //         //     // id: context.req.user.id
  //         //     id: ID
  //         //   }
  //         // },
  //         // User Friends posts
  //         {
  //           author: {
  //             friends: {
  //               some: {
  //                 id: context.req.user.id
  //               }
  //             }
  //           }
  //         },
  //         // Liked posts from Friends
  //         {
  //           likes: {
  //             some: {
  //               friends: {
  //                 some: {
  //                   id: context.req.user.id
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     select: {
  //       id: true,
  //       body: true,
  //       authorId: true,
  //       _count: {
  //         select: {
  //           likes: true,
  //           comments: true
  //         }
  //       },
  //       createdAt: true,
  //       likes: {
  //         where: {
  //           id: context.req.user.id
  //         },
  //         select: {
  //           id: true
  //         }
  //       }
  //     },
  //     orderBy: {
  //       createdAt: 'desc'
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

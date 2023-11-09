import { MyContext } from '../../../../../context'
import gql from 'graphql-tag'

export const Comment_TypeDefs = gql`
  type Comment {
    id: String!
    body: String!
    createdAt: DateTime!
    postId: String!
    authorId: String!
  }

  type Query {
    Get_Comments(post_id: String!): [Comment!]!
  }

  type Mutation {
    Create_Comment(post_id: String!, body: String!): Comment
  }

  scalar DateTime
`

export const Comment_Query = {
  Get_Comments: async (
    _parent: any,
    args: { post_id: string },
    context: MyContext
  ) => {
    const data = await context.prisma.comment.findMany({
      where: {
        postId: args.post_id
      }
    })

    return data
  }
}

export const Comment_Mutation = {
  Create_Comment: async (
    _parent: any,
    args: { post_id: string; body: string },
    context: MyContext
  ) => {
    const data = await context.prisma.comment.create({
      data: {
        body: args.body,
        postId: args.post_id,
        authorId: context.req.user.id
      }
    })

    return data
  }
}

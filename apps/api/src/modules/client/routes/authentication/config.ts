import { Prisma } from '@prisma/client'

export const UserSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  verfied: true,
  suspended: true,
  type: true,
  accountId: true,
  appleId: true,
  verificationEmail: true,
  username: true,
  _count: {
    select: {
      likes: true,
      friends: true,
      posts: true
    }
  }
}

export const UserSelectAuth: Prisma.UserSelect = {
  id: true,
  password: true,
  email: true,
  verfied: true,
  suspended: true,
  type: true,
  accountId: true,
  appleId: true,
  verificationEmail: true,
  username: true,
  _count: {
    select: {
      likes: true,
      friends: true,
      posts: true
    }
  }
}

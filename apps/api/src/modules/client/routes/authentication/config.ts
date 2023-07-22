import { Prisma } from '@prisma/client'

export const UserSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  verfied: true,
  suspended: true,
  google: true,
  googleaccountId: true,
  apple: true,
  appleaccountId: true,
  appleId: true,
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
  email: true,
  verfied: true,
  suspended: true,
  google: true,
  googleaccountId: true,
  apple: true,
  appleaccountId: true,
  appleId: true,
  username: true,
  _count: {
    select: {
      likes: true,
      friends: true,
      posts: true
    }
  }
}
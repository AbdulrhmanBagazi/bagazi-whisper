import { Prisma } from '@prisma/client'

export const UserSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  verfied: true,
  suspended: true,
  username: true,
  createdAt: true,
  google: true,
  googleaccountId: true,
  apple: true,
  appleaccountId: true,
  appleId: true
}

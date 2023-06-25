import { PrismaClient } from '.prisma/client'
import { ExpressContextFunctionArgument } from '@apollo/server/express4'

export interface MyContext {
  prisma: PrismaClient
  // token?: string
  req: ExpressContextFunctionArgument['req']
  res: ExpressContextFunctionArgument['res']
}

export const prisma = new PrismaClient()

export const context = async ({ req, res }: ExpressContextFunctionArgument) => {
  return { prisma, req, res }
}

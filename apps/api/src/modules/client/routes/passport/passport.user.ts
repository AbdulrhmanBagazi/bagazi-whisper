import { Prisma, PrismaClient, User } from '@prisma/client'
import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import { ValidPassword, CookieExtractor } from './index.utils'
import { JWT_PublicKey, ClientTokenMeta } from '../../config/jwt.config'
import { Request } from 'express'

const JwtStrategy = passportJwt.Strategy
const LocalStrategy = passportLocal.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const prisma = new PrismaClient()
const opts = {
  jwtFromRequest: (req: Request) => CookieExtractor(req, 'access_token'),
  secretOrKey: JWT_PublicKey,
  algorithm: ['RS256'],
  issuer: ClientTokenMeta.issuer,
  audience: ClientTokenMeta.audience,
  subject: ClientTokenMeta.subject
}

const optsRefresh = {
  jwtFromRequest: (req: Request) => CookieExtractor(req, 'refresh_token'),
  secretOrKey: JWT_PublicKey,
  algorithm: ['RS256'],
  issuer: ClientTokenMeta.issuer,
  audience: ClientTokenMeta.audience,
  subject: ClientTokenMeta.subject
}

const optsVerifyEmail = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_PublicKey,
  algorithm: ['RS256'],
  issuer: ClientTokenMeta.issuer,
  audience: ClientTokenMeta.audience,
  subject: ClientTokenMeta.subject
}

passport.use(
  'Client_SingIn',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email: string, password: string, cb) => {
      const user = await prisma.user.findUnique<Prisma.UserFindUniqueArgs>({
        where: {
          email: email.toLowerCase()
        },
        select: {
          id: true,
          email: true,
          password: true,
          verfied: true,
          verificationEmail: true,
          type: true,
          appleId: true,
          Profile: true
        }
      })

      if (user?.password && user) {
        if (await ValidPassword(user.password, password)) {
          return cb(null, user)
        }

        return cb(null, false)
      }

      return cb(null, false)
    }
  )
)

passport.use(
  'Client_Authenticate_Access_Token',
  new JwtStrategy(opts, async (payload, cb) => {
    const user: User | null =
      await prisma.user.findUnique<Prisma.UserFindUniqueArgs>({
        where: {
          id: payload.id
        },
        select: {
          id: true,
          email: true,
          verfied: true,
          verificationEmail: true,
          type: true,
          appleId: true,
          Profile: true
        }
      })
    if (user) {
      return cb(null, user)
    }

    return cb(null, false)
  })
)

passport.use(
  'Client_Authenticate_Refresh_Token',
  new JwtStrategy(optsRefresh, async (payload, cb) => {
    const user: User | null =
      await prisma.user.findUnique<Prisma.UserFindUniqueArgs>({
        where: {
          id: payload.id
        },
        select: {
          id: true,
          email: true,
          verfied: true,
          verificationEmail: true,
          type: true,
          appleId: true,
          Profile: true
        }
      })
    if (user) {
      return cb(null, user)
    }

    return cb(null, false)
  })
)

passport.use(
  'Client_Verify_Email',
  new JwtStrategy(optsVerifyEmail, async (payload, cb) => {
    const user: User | null =
      await prisma.user.findUnique<Prisma.UserFindUniqueArgs>({
        where: {
          id: payload.id
        },
        select: {
          id: true,
          email: true,
          verfied: true,
          verificationEmail: true,
          type: true,
          appleId: true,
          Profile: true
        }
      })

    if (user) {
      return cb(null, user)
    }

    return cb(null, false)
  })
)

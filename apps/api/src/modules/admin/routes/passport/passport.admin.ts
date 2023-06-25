import { Prisma, PrismaClient, Admin } from '@prisma/client'
import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import { ValidPassword, CookieExtractor } from './index.utils'
import { JWT_PublicKey, AdminTokenMeta } from '../../config/jwt.config'
import { Request } from 'express'
const JwtStrategy = passportJwt.Strategy
const LocalStrategy = passportLocal.Strategy
const prisma = new PrismaClient()
const opts = {
  jwtFromRequest: (req: Request) => CookieExtractor(req, 'admin_access_token'),
  secretOrKey: JWT_PublicKey,
  algorithm: ['RS256'],
  issuer: AdminTokenMeta.issuer,
  audience: AdminTokenMeta.audience,
  subject: AdminTokenMeta.subject
}

const optsRefresh = {
  jwtFromRequest: (req: Request) => CookieExtractor(req, 'admin_refresh_token'),
  secretOrKey: JWT_PublicKey,
  algorithm: ['RS256'],
  issuer: AdminTokenMeta.issuer,
  audience: AdminTokenMeta.audience,
  subject: AdminTokenMeta.subject
}

passport.use(
  'Admin_SingIn',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email: string, password: string, cb) => {
      const admin = await prisma.admin.findUnique<Prisma.AdminFindUniqueArgs>({
        where: {
          email
        },
        select: {
          id: true,
          email: true,
          name: true,
          password: true
        }
      })

      if (admin) {
        if (await ValidPassword(admin.password, password)) {
          return cb(null, {
            id: admin.id,
            name: admin.name
          })
        }

        return cb(null, false)
      }

      return cb(null, false)
    }
  )
)

passport.use(
  'Admin_Authenticate_Access_Token',
  new JwtStrategy(opts, async (payload, cb) => {
    const admin: Admin | null =
      await prisma.admin.findUnique<Prisma.AdminFindUniqueArgs>({
        where: {
          id: payload.id
        },
        select: {
          id: true,
          email: true,
          name: true
        }
      })

    if (admin) {
      return cb(null, {
        id: admin.id,
        name: admin.name
      })
    }

    return cb(null, false)
  })
)

passport.use(
  'Admin_Authenticate_Access_Token_Rest',
  new JwtStrategy(opts, async (payload, cb) => {
    const admin: Admin | null =
      await prisma.admin.findUnique<Prisma.AdminFindUniqueArgs>({
        where: {
          id: payload.id
        },
        select: {
          id: true,
          email: true,
          name: true
        }
      })

    if (admin) {
      return cb(null, {
        id: admin.id,
        name: admin.name
      })
    }

    return cb(null, false)
  })
)

passport.use(
  'Admin_Authenticate_Refresh_Token',
  new JwtStrategy(optsRefresh, async (payload, cb) => {
    const admin: Admin | null =
      await prisma.admin.findUnique<Prisma.AdminFindUniqueArgs>({
        where: {
          id: payload.id
        },
        select: {
          id: true,
          email: true,
          name: true
        }
      })

    if (admin) {
      return cb(null, {
        id: admin.id,
        name: admin.name
      })
    }

    return cb(null, false)
  })
)

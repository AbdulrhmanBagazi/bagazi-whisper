import { config } from 'dotenv'
config()
import { context } from './context'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
//auth routes
import Routes from './routes/index.routes'
//admin client
import { AdminResolvers, AdminTypeDefs } from './modules/admin/index.modules'
import {
  ClientResolvers,
  ClientTypeDefs
} from './modules/client/modules/protected/index.modules'
//client public
import { Client_PassportAuthenticate } from './modules/client/routes/passport/index.passport'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import { Admin_PassportAuthenticate } from './modules/admin/routes/passport/index.passport'

const PORT = process.env.PORT || 4000
const AdminURL =
  process.env.NODE_ENV === 'production'
    ? (process.env.ADMIN_URL as string)
    : 'http://localhost:5173'
const ClientURL =
  process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_URL as string)
    : 'http://localhost:3000'
const CompaniesURL =
  process.env.NODE_ENV === 'production'
    ? (process.env.COMPANIES_URL as string)
    : 'http://localhost:5005'

const Path = {
  Clientserver: '/graphql/client',
  PublicClientserver: '/graphql/public_client',
  Adminserver: '/graphql/admin'
}

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  app.use(
    cors({
      origin: [AdminURL, ClientURL, CompaniesURL],
      credentials: true
    })
  )

  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(helmet())
  app.use(morgan('tiny'))
  app.use(passport.initialize())

  //routes
  app.use('', Routes)

  //Admin gql
  const Adminserver = new ApolloServer({
    resolvers: [AdminResolvers],
    typeDefs: [AdminTypeDefs],
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  })

  //Client gql
  const Clientserver = new ApolloServer({
    resolvers: [ClientResolvers],
    typeDefs: [ClientTypeDefs],
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  })

  // //public client
  // const PublicClientserver = new ApolloServer({
  //   resolvers: [PublicClientResolvers],
  //   typeDefs: [PublicClientTypeDefs],
  //   plugins: [
  //     process.env.NODE_ENV === 'production'
  //       ? ApolloServerPluginLandingPageDisabled()
  //       : ApolloServerPluginLandingPageGraphQLPlayground(),
  //     ApolloServerPluginDrainHttpServer({ httpServer })
  //   ]
  // })

  await Adminserver.start()
  await Clientserver.start()
  // await PublicClientserver.start()

  app.use(
    Path.Adminserver,
    Admin_PassportAuthenticate,
    expressMiddleware(Adminserver, {
      context: context
    })
  )

  app.use(
    Path.Clientserver,
    Client_PassportAuthenticate,
    expressMiddleware(Clientserver, {
      context: context
    })
  )

  // app.use(
  //   Path.PublicClientserver,
  //   expressMiddleware(PublicClientserver, {
  //     context: context
  //   })
  // )

  //404
  app.get('*', (_req, res) => {
    res.status(404).send('what???')
  })
  app.post('*', (_req, res) => {
    res.status(404).send('what???')
  })
  app.put('*', (_req, res) => {
    res.status(404).send('what???')
  })
  app.delete('*', (_req, res) => {
    res.status(404).send('what???')
  })

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )
  console.log(
    `🔒 Client Server ready at http://localhost:${PORT}${Path.Clientserver}`
  )
  console.log(
    `🔒 Admin Server ready at http://localhost:${PORT}${Path.Adminserver}`
  )
}

startServer()

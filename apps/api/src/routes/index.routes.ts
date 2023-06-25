import express, { Application } from 'express'
import Client from './client.routes'
import Admin from './admin.routes'

const app: Application = express()

app.use('/client', Client)
app.use('/admin', Admin)

export default app

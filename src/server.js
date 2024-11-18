import './db/connectMongo.js'
import './db/schema/userSchema.js'

import express from 'express'
import signale from 'signale'


import firstrouter from './router/firstRouter.js'
import secondRouter from './router/secondRouter.js'
import thirdRouter from './router/thirdRouter.js'
import protectedRouter from './router/protectedRouter.js'

import bodyParser from 'body-parser'

const app = express()

// Use JSON parsing middleware
app.use(bodyParser.json())

// Use the routes
app.use('/', firstrouter)
app.use('/', secondRouter)
app.use('/', thirdRouter)
app.use('/', protectedRouter)

app.listen('3000', () => {
    signale.success('Server running on port 3000')
})

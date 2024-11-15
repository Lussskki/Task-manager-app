import './db/connectMongo.js'
import './db/schema/schema.js'
import express from 'express'
import signale from 'signale'
import router from './router/firstRouter.js'
import secondRouter from './router/secondRouter.js'
import bodyParser from 'body-parser'

const app = express()

// Use JSON parsing middleware
app.use(bodyParser.json())

// Use the routes
app.use('/', router)
app.use('/', secondRouter)

app.listen('3000', () => {
    signale.success('Server running on port 3000')
})

import './db/connectMongo.js'
import './db/schema/schema.js'
import express from 'express'
import signale from 'signale'
import router from './router/firstRoute.js'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use('/', router)

app.listen('3000', () =>{
    signale.success('Server running on port 3000')
})
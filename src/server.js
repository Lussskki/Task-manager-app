import express from 'express'
import signale from 'signale'
import router from './router/firstRoute.js'

const app = express()

app.use('/', router)

app.listen('3000', () =>{
    signale.success('Server running on port 3000')
})
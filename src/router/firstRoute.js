import express from 'express'
import signale from 'signale'
const router = express.Router()

router.get('/', (req,res)=>{
    signale.success('get method is runnig corectly')
    res.send('Hello World')
})

export default router 
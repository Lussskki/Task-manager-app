import express, { request } from 'express'
import signale from 'signale'
import Text from '../db/schema/schema.js'
const router = express.Router()

router.get('/', (req,res)=>{
    signale.success('Get method is runnig corectly')
    res.send('Hello World')
})

router.post('/add-text', async (req, res) => {
    const { text } = req.body 
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }
    try {
        const newText = new Text({ text })
        await newText.save()
        res.status(201).json({ message: 'Text added successfully', newText })
        console.log('Req body: ', req.body) 
    } catch (error) {
      res.status(500).json({ message: 'Error adding text', error })
    }
  })
  

export default router 
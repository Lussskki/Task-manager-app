import Info from '../db/schema/infoSchema.js'

import express from 'express'




const thirdRouter = express.Router()

// Third router for info, that goes in database
thirdRouter.post('/addInfo', async (req,res) => {
 
    const {field1} = req.body
    // Validate incoming data 
    if(!field1) {
        return res.status(401).json({ message: 'field is required'})
    }
    try{
        // Create a new instance with the data from the request
        const newData = new Info ({
            field1,
        })
        // Save to the database
        await newData.save()

        // If successful, send a 201 response
        return res.status(201).json({message: 'Added successfully', data: newData})
        
    }catch(error){
        // If there's an error, send a 500 response
        return res.status(500).json({ message: 'Error saving data', error })
    }
})


export default thirdRouter
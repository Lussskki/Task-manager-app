import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'

import UserSchema from '../db/schema/userSchema.js'

const protectedRouter = express.Router()

protectedRouter.get('/profile', authMiddleware, async (req, res) => {

    try{
        // Get userId from the decoded token
        const userId = req.user.userId

        // Find the user in the database, exclude the password field
        const user = await UserSchema.findById(userId).select('-password')

        // If user not found, send 404 error
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        // Send the user's profile data
        res.status(200).json({message: 'Profile fetched successfuly', user})

    }catch(error){
        // Handle any errors and send a 500 response
        res.status(500).json({message: 'Error fetching profile data', error})

    }
})

export default protectedRouter
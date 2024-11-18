import express from 'express'
import UserSchema from '../db/schema/userSchema.js'
import bcrypt from 'bcrypt'

const firstRouter = express.Router()

const saltRounds = 10

// Signup router
firstRouter.post('/signup', async (req, res) => { 
    // Necessary information from the request body
    const { name, lastName, email,  password } = req.body

    // Check if fields are present
    if (!email|| !password || !name || !lastName) {
        return res.status(400).json({ message: ' All info are required' })
    }
    // Password characters
    if (password.length < 8 || password.length >16) {
       return res.status(400).json({message: `Password must be between 8 and 16 characters!`})
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create a new instance of Text with both text and password
        const newEmail = new UserSchema({ email, name, lastName, password: hashedPassword})
        
        // Save to MongoDB 
        await newEmail.save();
        
        return res.status(201).json({ message: 'Email added successfully', newEmail })
    } catch (error) {
        return res.status(500).json({ message: 'Error with adding', error })
    }
})

export default firstRouter

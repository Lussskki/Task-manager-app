import UserSchema from '../db/schema/userSchema.js'

import express from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secondRouter = express.Router()

const jwtSecret = process.env.SECRET  // It's stored securely using dotenv

// Login router
secondRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    // Check email and password
    if (!email || !password) {
        return res.status(400).json({ message: `Both email and password are required` })
    }

    try {
        // Find user by email
        const user = await UserSchema.findOne({ email })

        // If user is not found
        if (!user) {
            return res.status(401).json({ message: `Not found email or password` })
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: `Invalid email or password` })
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1Hr' })

        // Send token to client and log success message
        return res.status(200).json({ message: `Login successful`, token })
    } catch (err) {
        // Error handling
        return res.status(500).json({ message: `Error during login`, err })
    }
})

export default secondRouter

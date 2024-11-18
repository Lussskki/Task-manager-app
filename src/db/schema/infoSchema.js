// Inputed data schema from frontend
import mongoose from 'mongoose'

const infoSchema = new mongoose.Schema({
    field1: {
        type: String,
        required: true,
    }
})

const Info = mongoose.model('Info', infoSchema)
export default Info

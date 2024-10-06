import mongoose from 'mongoose';

const AuthenticationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Principal', 'Teacher', 'Student'], required: true }
    
});

export const Auth =  mongoose.model('Authentication', AuthenticationSchema);
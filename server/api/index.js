import express from 'express'
import mongoose from 'mongoose'
import authRoutes from '../routes/auth.js';
import principalRoutes from '../routes/principal.js'
import teachersRoutes from '../routes/teachers.js'
import studentRoutes from '../routes/student.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(cors())

mongoose.connect(process.env.DATABASE_CON)
.then(()=>console.log('database connected'))
.catch((err)=>console.error(err))

app.get('/',(req,res)=>{
  res.json({message:"hello"})
})

app.use('/auth',authRoutes)
app.use('/principal',principalRoutes)
app.use('/teachers', teachersRoutes)
app.use('/student', studentRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

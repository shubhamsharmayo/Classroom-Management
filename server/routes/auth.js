import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Auth} from '../models/authentication.js';

const router = express.Router();
const app = express();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.use(cors());

router.get('/login',(req,res)=>{
  res.json({message:"hello"})
})

router.post("/login", async (req, res) => {
  
  const email = req.body.email
  const password = req.body.password
    const user = await Auth.findOne({ email });
    if (!user || user.password !== password){
     
        return res.json("not found")
    }else{
        // console.log("Welcome")
        return res.json(user)
    }
        
    
    //   return res.status(400).json({ msg: 'Invalid credentials' });
    // res.json({ msg: 'login successful', user });
  
});

router.post("/register", async (req, res) => {
  try {
    const users = new Auth({
      name: req.body.names,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    await users.save();
    res.json({ msg: 'User registered', users });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;

import express from 'express';
import {Timetable} from '../models/timetable.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Class } from '../models/classroom.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());



router.post("/studenttimetable",async(req,res)=>{
   let name = req.body.name
    const found = await Class.find({students:name});
    res.json(found);
    // console.log(found)
})

router.post("/student",async(req,res)=>{
    let name = req.body
    const found = await Timetable.find({classroomID:name});
    res.json(found);
    console.log(name)
})

export default router;

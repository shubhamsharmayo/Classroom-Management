import express from 'express';
import {Timetable} from '../models/timetable.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Class } from '../models/classroom.js'; 

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.get('/classidfetch', async(req,res)=>{
let classfetch = await Class.find({})
console.log(classfetch)
res.json(classfetch)
})

router.post('/timetable', async (req, res) => {
    console.log(req.body)
    
    try {
    
      
        const timetables = new Timetable({ 
            classroomID: req.body.classroomID,
             subject:req.body.subject,
             days:req.body.days,
              startTime:req.body.startTime,
               endTime:req.body.endTime });
        await timetables.save();
        res.json( 'Time table created');
        
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get("/teacherdashboard",async(req,res)=>{
    const found = await Timetable.find({});
    res.json(found);
})



router.delete('/timetable/:id', async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!timetable) {
            return res.status(404).json({ msg: 'Timetable not found' });
        }
        res.json({ msg: 'Timetable deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update timetable
router.put('/timetable/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const timetable = await Timetable.findByIdAndUpdate(id, updateData, { new: true });
        if (!timetable) {
            return res.status(404).json({ msg: 'Timetable not found' });
        }
        res.json(timetable);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/studentlist/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
   
    try {
        const students = await Class.findByIdAndUpdate(id, updateData, { new: true });
        if (!students) {
            return res.status(404).json({ msg: 'class not found' });
        }
        res.json(students);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});
router.post('/assignclass',async (req,res)=>{
   let names = req.body.name
let assigned = await Class.find({teacher:names})
res.json(assigned)
})



export default router;

import express from "express";
import { Class } from "../models/classroom.js";
import bodyParser from "body-parser";
import cors from "cors";
import { Timetable } from "../models/timetable.js";
import { Auth } from "../models/authentication.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());
router.use(express.static("views"));

router.post("/classroom", async (req, res) => {
  let id = req.body.classroomid
  try {
    const classID = await Class.findOne({classroomID:id})
    if(classID){
       return res.json('class already exist')
    }
    const classroom = new Class({
        classroomID:req.body.classroomid,
     
      startTime: req.body.starttime,
      endTime: req.body.endtime,
      days: req.body.days,
      teacher: req.body.teacher,
      students: req.body.students,
    });
    await classroom.save();
    res.json({ msg: "Classroom created", classroom });
    
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.get("/classroomdetails", async (req, res) => {
  const found = await Class.find({});
  res.json(found);
});

// In your existing express router file

router.delete('/classroom/:id', async (req, res) => {
  try {
      const classroom = await Class.findByIdAndDelete(req.params.id);
      if (!classroom) {
          return res.status(404).json({ msg: 'Classroom not found' });
      }
      res.json({ msg: 'Classroom deleted' });
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
});

// In your existing express router file

router.put('/classrooms/:id', async (req, res) => {
  try {
      const classroom = await Class.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!classroom) {
          return res.status(404).json({ msg: 'Classroom not found' });
      }
      res.json(classroom);
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
});

router.get("/timetabledashboard",async(req,res)=>{
  const found = await Timetable.find({});
  res.json(found);
})


router.get("/teachername",async(req,res)=>{
  const dets = await Auth.find({role:'Teacher'})
  res.json(dets)
})
router.get("/studentname",async(req,res)=>{
  const dets = await Auth.find({role:'Student'})
  res.json(dets)
})

export default router;

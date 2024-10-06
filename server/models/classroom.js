import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
    classroomID:{type:String, required:true, unique:true},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    days: { type: [String], required: true },
    teacher: { type: String, required: true },
    students: { type: [String]}
});

export const Class = mongoose.model('Classroom', ClassroomSchema);

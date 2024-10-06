import mongoose from 'mongoose';

const TimetableSchema = new mongoose.Schema({
    classroomID: { type: String,required: true },
    days:{type:[String],required:true},
    subject: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

export const Timetable = mongoose.model('Timetable', TimetableSchema);

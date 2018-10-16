'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherDetailSchema = new Schema({
    teacher_id: String,
    graduate: String,
    mail: String,
    phone: String,
    position: String,
    desc: String,
    items: [
        {
            value: String,
            index: Number,
            status: Number
        }
    ],
    total: Number,
    working_time: String
});

teacherDetailSchema.index({ id: 1 });

const TeacherDetail = mongoose.model('TeacherDetail', teacherDetailSchema);

export default TeacherDetail;
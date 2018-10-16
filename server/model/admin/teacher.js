'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: String,
    good: String,
    user_id: String,
    picture: String,
    score: String,
    tag1: String,
    tag2: String,
    time: String,
    category: Array,
    coordinates: [Number]
});

teacherSchema.index({ id: 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolDetailSchema = new Schema({
    school_id: String,
    egalperson: String,
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
    image: Array,
    total: Number,
    working_time: String
});

schoolDetailSchema.index({ id: 1 });

const SchoolDetail = mongoose.model('SchoolDetail', schoolDetailSchema);

export default SchoolDetail;
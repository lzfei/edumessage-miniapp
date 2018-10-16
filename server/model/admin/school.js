'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: String,
    good: String,
    user_id: String,
    logo: String,
    score: String,
    tag1: String,
    tag2: String,
    founddate: String,
    category: Array,
    coordinates: [Number]
});

schoolSchema.index({ id: 1 });

const School = mongoose.model('School', schoolSchema);

export default School;
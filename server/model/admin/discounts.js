'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const discountsSchema = new Schema({
    title: String,
    position: String,
    time: String,
    ori_price: String,
    dis_price: String,
    image: String,
    phone: String
});

discountsSchema.index({ id: 1 });

const Discounts = mongoose.model('Discounts', discountsSchema);

export default Discounts;
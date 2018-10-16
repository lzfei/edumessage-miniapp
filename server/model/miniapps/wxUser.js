'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const wxUserSchema = new Schema({
    openid: String,
    publish: Array,
    concern: Array,
    collect: Array
});

wxUserSchema.index({ id: 1 });

const WxUser = mongoose.model('WxUser', wxUserSchema);

export default WxUser;
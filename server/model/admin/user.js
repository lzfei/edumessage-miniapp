'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: String,
    password: String
    // id: String,
    // create_time: String,
    // admin: { type: String, default: '管理员'},
    // status: Number, // 1.普通管理员 2.超级管理员 
    // avatar: {type: String, default: 'default.jpg'},
    // city: String
});

userSchema.index({id: 1});

const User = mongoose.model('User', userSchema);

export default User;
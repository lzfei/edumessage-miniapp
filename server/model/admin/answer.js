'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    q_id: String,
    des: String,
    date: String,     // 发布日期
    source: Number, // 1.小程序 2.admin用户
    user_id: String, //admin用户id
    user_name: String, //admin用户姓名或者微信用户命
    avatar_url: String, //用户头像
    user_des: String
});

answerSchema.index({ id: 1 });

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
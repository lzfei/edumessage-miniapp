'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const publishSchema = new Schema({
    title: String,
    des: String,
    main: String,
    date: String,     // 发布日期
    source: Number, // 1.小程序 2.admin用户
    openid: String, //微信用户唯一标示
    user_name: String, //微信用户名
    avatar_url: String, //用户头像
    user_des: String,
    category: String, // 类别 0 提问 1 图文 3 视频
    image_url: Array,
    answer_count: Number
});

publishSchema.index({ id: 1 });

const Publish = mongoose.model('Publish', publishSchema);

export default Publish;
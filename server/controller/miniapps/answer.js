'use strict';

import AnswerModel from '../../model/admin/answer';
import PublishModel from '../../model/admin/publish';
import formidable from 'formidable';
import moment from 'moment';

class Answer {
    constructor() {
    }

    // 添加发表内容
    async addAnswer(req, res, next) {
        const form = req.body;
        form['date'] = moment().format('YYYY-MM-DD HH:mm');
        if (form['source'] === 1) {
            form['user_des'] = '微信用户'
        } else {
            form['user_des'] = '平台用户'
        }
        try {
            const newAnswer = new AnswerModel(form);
            await AnswerModel.create(newAnswer);
            await PublishModel.findOneAndUpdate({ _id: form.q_id }, { $inc: { answer_count: 1 } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '添加成功'
            })

        } catch (error) {

        }
    }

    // 获取发布列表
    async getAnswerList(req, res, next) {
        try {
            const { limit = 5, offset = 0, q_id } = req.body;
            let list = await AnswerModel.find({ q_id: q_id }).skip(Number(offset)).limit(Number(limit)).sort({ 'date': -1 });
            res.send({
                status: 1,
                data: list,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {

        }
    }

    // 获取回答总数
    async getAnswerCount(req, res, next) {
        try {
            const { q_id } = req.body;
            const count = await AnswerModel.find({ q_id: q_id}).count();
            res.send({
                status: 1,
                count: count,
                type: 'SUCCESS',
                message: '请求成功'
            })
        } catch (error) {

        }
    }
}

export default new Answer();
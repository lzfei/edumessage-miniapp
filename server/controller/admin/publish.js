'use strict';

import PublishModel from '../../model/admin/publish';
import formidable from 'formidable';

class Publish {
    constructor() {
    }
    // 获取发布列表
    async getPublishList(req, res, next) {
        try {
            const { limit = 5, offset = 0 } = req.body;
            let list = await PublishModel.find().skip(Number(offset)).limit(Number(limit));
            res.send({
                status: 1,
                data: list,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {

        }
    }

    // 获取发布总数
    async getPublishCount(req, res, next) {
        try {
            const count = await PublishModel.find().count();
            res.send({
                status: 1,
                count: count,
                type: 'SUCCESS',
                message: '请求成功'
            })
        } catch (error) {

        }
    }

    //更新发布信息
    async updatePublish(req, res, next) {
        const form = req.body;
        try {
            await PublishModel.findOneAndUpdate({ _id: form._id }, { $set: { name: form.name, good: form.good, tag1: form.tag1, tag2: form.tag2 } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '编辑成功'
            })
        } catch (error) {

        }
    }

    // 删除发布信息
    async removePublish(req, res, next) {
        const form = req.body;
        try {

            await PublishModel.remove({ _id: form._id });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '删除成功'
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Publish();
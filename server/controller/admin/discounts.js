'use strict';

import DiscontsModel from '../../model/admin/discounts';
import formidable from 'formidable';

class Discounts {
    constructor() {
    }

    // 添加优惠信息
    async addDiscounts(req, res, next) {
        const form = req.body;
        try {
            const newDisounts = new DiscontsModel(form);
            await DiscontsModel.create(newDisounts);
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '添加成功'
            })

        } catch (error) {

        }
    }

    // 获取优惠信息列表
    async getDiscountsList(req, res, next) {
        try {
            const { limit = 5, offset = 0 } = req.body;
            let list = await DiscontsModel.find().skip(Number(offset)).limit(Number(limit));
            res.send({
                status: 1,
                data: list,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {

        }
    }

    // 获取优惠总数
    async getDiscountsCount(req, res, next) {
        try {
            const count = await DiscontsModel.find().count();
            res.send({
                status: 1,
                count: count,
                type: 'SUCCESS',
                message: '请求成功'
            })
        } catch (error) {

        }
    }

    //更新优惠信息
    async updateDiscounts(req, res, next) {
        const form = req.body;
        try {
            await DiscontsModel.findOneAndUpdate({ _id: form._id }, { $set: { title: form.title, position: form.position, time: form.time, ori_price: form.ori_price, dis_price: form.dis_price, image: form.image, phone: form.phone } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '编辑成功'
            })
        } catch (error) {

        }
    }

    // 删除机构信息
    async removeDiscounts(req, res, next) {
        const form = req.body;
        try {

            await DiscontsModel.remove({ _id: form._id });
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

export default new Discounts();
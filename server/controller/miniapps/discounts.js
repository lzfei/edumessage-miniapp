'use strict';

import DiscontsModel from '../../model/admin/discounts';

class Discounts {
    constructor() {
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
}

export default new Discounts();
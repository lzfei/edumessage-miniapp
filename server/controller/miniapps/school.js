'use strict';

import SchoolModel from '../../model/admin/school';
import SchoolDetailModel from '../../model/admin/schoolDetail';
import formidable from 'formidable';

class School {
    constructor() {
    }

    // 获取机构基本信息
    async getSchoolList(req, res, next) {
        try {
            const { limit = 5, offset = 0, category = 0, longitude = 108.947001, latitude = 34.259442} = req.body;
            let list = await SchoolModel
            .aggregate(
                [
                    {
                        $geoNear: {
                            near: [longitude, latitude],
                            distanceField: "dist.calculated",
                            maxDistance: 10000,
                            query: { $or: [{ 'category': '0' }, { 'category': category }] },
                            includeLocs: "dist.location",
                            spherical: true,
                            distanceMultiplier: 6371
                        }
                    }
                ]
            )
            .skip(Number(offset)).limit(Number(limit));
            res.send({
                status: 1,
                data: list,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {
            console.log(error);
        }
    }

    // 获取机构总数
    async getSchoolCount(req, res, next) {
        try {
            const count = await SchoolModel.find().count();
            res.send({
                status: 1,
                count: count,
                type: 'SUCCESS',
                message: '请求成功'
            })
        } catch (error) {

        }
    }

    // 根据id获取机构信息
    async getSchoolInfo(req, res, next) {
        const form = req.body;
        try {
            let response = await SchoolModel.findOne({ _id: form._id });
            res.send({
                status: 1,
                type: 'SUCCESS',
                data: response,
                message: '请求成功'
            })
        } catch (error) {
            console.log(error);
        }
    }

    // 根据id获取机构详细信息
    async getSchoolDetail(req, res, next) {
        const form = req.body;
        try {
            let response = await SchoolDetailModel.findOne({ school_id: form.school_id });
            res.send({
                status: 1,
                type: 'SUCCESS',
                data: response,
                message: '请求成功'
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new School();
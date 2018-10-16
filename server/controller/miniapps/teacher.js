'use strict';

import TeacherModel from '../../model/admin/teacher';
import TeacherDetailModel from '../../model/admin/teacherDetail';
import formidable from 'formidable';

class Teacher {
    constructor() {
    }

    // 获取老师基本信息
    async getTeacherList(req, res, next) {
        try {
            const { limit = 5, offset = 0, category = 0, longitude = 108.947001, latitude = 34.259442 } = req.body;

            let list = await TeacherModel
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

    // 获取老师总数
    async getTeacherCount(req, res, next) {
        try {
            const count = await TeacherModel.find().count();
            res.send({
                status: 1,
                count: count,
                type: 'SUCCESS',
                message: '请求成功'
            })
        } catch (error) {

        }
    }

    // 根据id获取老师信息
    async getTeacherInfo(req, res, next) {
        const form = req.body;
        try {
            let response = await TeacherModel.findOne({ _id: form._id });
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

    // 根据id获取老师详细信息
    async getTeacherDetail(req, res, next) {
        const form = req.body;
        try {
            let response = await TeacherDetailModel.findOne({ teacher_id: form.teacher_id });
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

export default new Teacher();
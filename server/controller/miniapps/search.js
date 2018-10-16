'use strict';

import SchoolModel from '../../model/admin/school';
import TeacherModel from '../../model/admin/teacher';
import PublishModel from '../../model/admin/publish';

class Search {
    constructor() {
    }

    // 获取机构基本信息
    async searchMsg(req, res, next) {
        try {
            const { keywords = '', longitude = 108.947001, latitude = 34.259442 } = req.body;
            let schoolList = await SchoolModel
                .aggregate(
                    [
                        {
                            $geoNear: {
                                near: [longitude, latitude],
                                distanceField: "dist.calculated",
                                maxDistance: 10000,
                                query: { $or: [{ "name": { $regex: keywords, $options: 'i' } }, { "good": { $regex: keywords, $options: 'i' } }] },
                                includeLocs: "dist.location",
                                spherical: true,
                                distanceMultiplier: 6371
                            }
                        }
                    ]
                );
            let teacherList = await TeacherModel
                .aggregate(
                    [
                        {
                            $geoNear: {
                                near: [longitude, latitude],
                                distanceField: "dist.calculated",
                                maxDistance: 10000,
                                query: { $or: [{ "name": { $regex: keywords, $options: 'i' } }, { "good": { $regex: keywords, $options: 'i' } }] },
                                includeLocs: "dist.location",
                                spherical: true,
                                distanceMultiplier: 6371
                            }
                        }
                    ]
                );
            let resultList = { 'school': schoolList, 'teacher': teacherList}
            res.send({
                status: 1,
                data: resultList,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {
            console.log(error);
        }
    }

    async searchPublishMsg(req, res, next) {
        try {
            const { keywords = ''} = req.body;
            let list = await PublishModel.find({ $or: [{ "main": { $regex: keywords, $options: 'i' } }, { "des": { $regex: keywords, $options: 'i' }}, { "user_name": { $regex: keywords, $options: 'i' } }] }).sort({ 'answer_count': -1 });
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

export default new Search();
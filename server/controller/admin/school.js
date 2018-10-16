'use strict';

import SchoolModel from '../../model/admin/school';
import SchoolDetailModel from '../../model/admin/schoolDetail';
import formidable from 'formidable';

class School {
    constructor() {
        this.basicInfo = this.basicInfo.bind(this)
    }

    // 添加机构基本信息
    async basicInfo(req, res, next) {
        const form = req.body;
        try {
            const newSchool = new SchoolModel(form);
            await SchoolModel.create(newSchool);
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '添加成功'
            })

        } catch (error) {

        }
    }

    // 获取机构基本信息
    async getSchoolList(req, res, next) {
        try {
            const { limit = 5, offset = 0 } = req.body;
            let list = await SchoolModel.find().skip(Number(offset)).limit(Number(limit));
            res.send({
                status: 1,
                data: list,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {

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

    //更新机构信息
    async updateSchool(req, res, next) {
        const form = req.body;
        try {
            await SchoolModel.findOneAndUpdate({ _id: form._id }, { $set: { name: form.name, good: form.good, tag1: form.tag1, tag2: form.tag2 } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '编辑成功'
            })
        } catch (error) {
            
        }
    }

    // 删除机构信息
    async removeShool(req, res, next) {
        const form = req.body;
        try {
            
            await SchoolModel.remove({_id: form._id});
            await SchoolDetailModel.remove({ school_id: form._id });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '删除成功'
            })
        } catch (error) {
            console.log(error);
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

    // 上传机构logo图片
    async uploadLogo(req, res, next) {
        const form = req.body;
        try {
            await SchoolModel.findOneAndUpdate({ _id: form._id }, { $set: { logo: form.logo} });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '上传成功'
            })
        } catch (error) {

        }
    }

    // 添加机构详情
    async addSchoolDetail(req, res, next) {
        const form = req.body;
        try {
            const newSchool = new SchoolDetailModel(form);
            await SchoolDetailModel.create(newSchool);
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '添加成功'
            })

        } catch (error) {

        }
    }

    //更新机构信息
    async updateSchoolDetail(req, res, next) {
        const form = req.body;
        try {
          await SchoolDetailModel.findOneAndUpdate({ _id: form._id }, { $set: { total: form.total, egalperson: form.egalperson, mail: form.mail, phone: form.phone, position: form.position, desc: form.desc, items: form.items, image: form.image, working_time: form.working_time } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '编辑成功'
            })
        } catch (error) {

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
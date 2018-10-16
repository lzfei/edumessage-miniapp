'use strict';

import TeacherModel from '../../model/admin/teacher';
import TeacherDetailModel from '../../model/admin/teacherDetail';
import formidable from 'formidable';

class Teacher {
    constructor() {
    }

    // 添加老师基本信息
    async teacherInfo(req, res, next) {
        const form = req.body;
        try {
            const newTeacher = new TeacherModel(form);
            await TeacherModel.create(newTeacher);
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '添加成功'
            })

        } catch (error) {

        }
    }

    // 获取老师基本信息
    async getTeacherList(req, res, next) {
        try {
            const { limit = 5, offset = 0 } = req.body;
            let list = await TeacherModel.find().skip(Number(offset)).limit(Number(limit));
            res.send({
                status: 1,
                data: list,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {

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

    //更新老师信息
    async updateTeacher(req, res, next) {
        const form = req.body;
        try {
            await TeacherModel.findOneAndUpdate({ _id: form._id }, { $set: { name: form.name, good: form.good, tag1: form.tag1, tag2: form.tag2 } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '编辑成功'
            })
        } catch (error) {

        }
    }

    // 删除老师信息
    async removeTeacher(req, res, next) {
        const form = req.body;
        try {

            await TeacherModel.remove({ _id: form._id });
            await TeacherDetailModel.remove({ teacher_id: form._id });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '删除成功'
            })
        } catch (error) {
            console.log(error);
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

    // 上传老师图片
    async uploadPicture(req, res, next) {
        const form = req.body;
        try {
            await TeacherModel.findOneAndUpdate({ _id: form._id }, { $set: { picture: form.picture } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '上传成功'
            })
        } catch (error) {

        }
    }

    // 添加老师详情
    async addTeacherDetail(req, res, next) {
        const form = req.body;
        try {
            const newTeacher = new TeacherDetailModel(form);
            await TeacherDetailModel.create(newTeacher);
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '添加成功'
            })

        } catch (error) {

        }
    }

    //更新老师信息
    async updateTeacherDetail(req, res, next) {
        const form = req.body;
        try {
          await TeacherDetailModel.findOneAndUpdate({ _id: form._id }, { $set: { date: form.date, egalperson: form.egalperson, mail: form.mail, phone: form.phone, position: form.position, desc: form.desc, items: form.items, image: form.image, working_time: form.working_time } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '编辑成功'
            })
        } catch (error) {

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
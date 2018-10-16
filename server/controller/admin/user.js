'use strict';

import UserModel from '../../model/admin/user'
import formidable from 'formidable'

class User {
    constructor() {
        this.login = this.login.bind(this)
    }

    // 注册登录
    async login (req, res, next) {
        const form = req.body;
        try {
            if (form.user_name !== '') {
                const admin = await UserModel.findOne({ 'user_name': form.user_name});
                if (admin) {
                    if (admin.password == form.password) {
                        res.send({
                            status: 1,
                            data: admin,
                            type: 'SUCCESS',
                            message: '登陆成功'
                        })
                    }else{
                        res.send({
                            status: 0,
                            type: 'ERROR_PASSWORD',
                            message: '密码错误'
                        })
                    }
                    
                }else {
                    const newUser = {
                        user_name: form.user_name,
                        password: form.password
                    }
                    const admin = await UserModel.create(newUser);
                    res.send({
                        status: 1,
                        data: admin,
                        type: 'SUCCESS',
                        message: '注册成功'
                    })
                }
                
            }
            
        } catch (error) {

        }
    }
}

export default new User();
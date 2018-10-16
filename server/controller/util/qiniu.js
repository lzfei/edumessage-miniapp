'use strict';

import qiniu from 'qiniu';
import config from '../../config/default';

class Qiniu {
    constructor() {
    }
    // 获取上传凭证
    async getUploadToken(req, res, next) {
        try {
            let mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
            let options = {
                scope: config.scope,
                expires: 7200
            };
            let putPolicy = new qiniu.rs.PutPolicy(options);
            let uploadToken = putPolicy.uploadToken(mac);
            res.send({
                status: 1,
                data: uploadToken,
                type: 'SUCCESS',
                message: '请求成功'
            })

        } catch (error) {

        }
    }
}

export default new Qiniu();
'use strict';
import config from '../../config/default';
import https from 'https';
import WxUserModel from '../../model/miniapps/wxUser';

class Login {
    constructor() {
    }
    // 获取微信用户凭证
    async getOpenId(req, res, next) {
        const form = req.body;
        try {
            let resInfo = null;
            let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + config.appid + "&secret=" + config.secret + "&js_code=" + form.code + "&grant_type=authorization_code";
            https.get(url, function (res2) {
                let datas = [];
                let size = 0;
                res2.on('data', function (data) {
                    datas.push(data);
                    size += data.length;
                });
                res2.on('end', async function () {
                    let buff = Buffer.concat(datas, size);
                    let result = JSON.parse(buff.toString());
                    // 将获取到的openid如果没有存储，保存到数据库
                    let findWxUser = await WxUserModel.findOne({'openid': result.openid});
                    if (!findWxUser) {
                        const newWxUser = new WxUserModel({'openid': result.openid});
                        await WxUserModel.create(newWxUser);
                    }else {
                        resInfo = findWxUser;
                    }
                    res.send({
                        status: 1,
                        data: resInfo,
                        type: 'SUCCESS',
                        message: '请求成功'
                    })
                });
            }).on('error', function (err) {
                Logger.error(err.stack)
                callback.apply(null);
            });  
            

        } catch (error) {

        }
    }

    // 关注
    async doConcern(req, res, next) {
        const form = req.body;
        let myConcern = [];
        try {
            let findWxUser = await WxUserModel.findOne({ 'openid': form.mine_openid });
            if (findWxUser) {
                myConcern = findWxUser.concern;
                let obj = { 'type': '1', 'openid': form.user_openid };
                myConcern.push(obj);
            }
            await WxUserModel.findOneAndUpdate({ openid: form.mine_openid }, { $set: { concern: myConcern } });
            res.send({
                status: 1,
                type: 'SUCCESS',
                message: '关注成功'
            })
        } catch (error) {
            res.send({
                status: 0,
                type: 'ERROR',
                message: '关注失败'
            })
        }
        
    }
}

export default new Login();
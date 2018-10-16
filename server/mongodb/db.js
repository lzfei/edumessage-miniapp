'use strict';

import mongoose from 'mongoose'
// import config from 'config-lite'
import config from '../config/default'
import chalk from 'chalk'

mongoose.connect(config.url);

const db = mongoose.connection;

db.once('open', function() {
    console.log(
        chalk.green('数据库链接成功')
    );
});

db.on('error', function(error) {
    console.log(
        chalk.red('数据库链接失败：' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
        chalk.red('数据库断开链接，查询开始链接')
    );
    mongoose.connect(config.url);
});

export default db;
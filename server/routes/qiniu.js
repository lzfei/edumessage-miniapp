'use strict';

import express from 'express'
import Qiniu from '../controller/util/qiniu'

const router = express.Router();

router.get('/getuploadtoken', Qiniu.getUploadToken);

export default router;
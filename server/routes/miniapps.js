'use strict';

import express from 'express'
import School from '../controller/miniapps/school'
import Teacher from '../controller/miniapps/teacher'
import Publish from '../controller/miniapps/publish'
import Answer from '../controller/miniapps/answer'
import Login from '../controller/miniapps/login'
import Search from '../controller/miniapps/search'
import Discounts from '../controller/miniapps/discounts';

const router = express.Router();

router.post('/getschoollist', School.getSchoolList);
router.post('/getschoolinfo', School.getSchoolInfo);
router.post('/getschooldetail', School.getSchoolDetail);
router.post('/getteacherlist', Teacher.getTeacherList);
router.post('/getteacherinfo', Teacher.getTeacherInfo); 
router.post('/getteacherdetail', Teacher.getTeacherDetail);
router.post('/publish', Publish.publish);
router.post('/getpublishlist', Publish.getPublishList);
router.post('/gethotpublishlist', Publish.getHotPublishList);
router.post('/getmypublishlist', Publish.getMyPublishList);
router.post('/getpublishdetail', Publish.getPublishDetail);
router.post('/deletemypublish', Publish.deleteMyPublish);
router.post('/addanswer', Answer.addAnswer);
router.post('/getanswerlist', Answer.getAnswerList);
router.post('/getanswercount', Answer.getAnswerCount);
router.post('/getopenid', Login.getOpenId);
router.post('/search', Search.searchMsg);
router.post('/searchpublish', Search.searchPublishMsg);
router.post('/doconcern', Login.doConcern);
router.post('/getdiscountslist', Discounts.getDiscountsList);


export default router;
'use strict';

import express from 'express'
import User from '../controller/admin/user'
import School from '../controller/admin/school'
import Teacher from '../controller/admin/teacher'
import Publish from '../controller/admin/publish'
import Discounts from '../controller/admin/discounts';

const router = express.Router();

router.post('/login', User.login);
router.post('/basicinfo', School.basicInfo);
router.post('/getschoollist', School.getSchoolList);
router.get('/getschoolcount', School.getSchoolCount);
router.post('/updateschool', School.updateSchool);
router.post('/removeshool', School.removeShool);
router.post('/getschoolinfo', School.getSchoolInfo); 
router.post('/uploadlogo', School.uploadLogo);
router.post('/addschooldetail', School.addSchoolDetail);
router.post('/getschooldetail', School.getSchoolDetail);
router.post('/updateschooldetail', School.updateSchoolDetail);
router.post('/teacherinfo', Teacher.teacherInfo);
router.post('/getteacherlist', Teacher.getTeacherList);
router.get('/getteachercount', Teacher.getTeacherCount);
router.post('/updateteacher', Teacher.updateTeacher);
router.post('/removeteacher', Teacher.removeTeacher);
router.post('/getteacherinfo', Teacher.getTeacherInfo);
router.post('/uploadpicture', Teacher.uploadPicture);
router.post('/addteacherdetail', Teacher.addTeacherDetail);
router.post('/getteacherdetail', Teacher.getTeacherDetail);
router.post('/updateteacherdetail', Teacher.updateTeacherDetail);
router.post('/getpublishlist', Publish.getPublishList);
router.get('/getpublishcount', Publish.getPublishCount);
router.post('/updatepublish', Publish.updatePublish);
router.post('/removepublish', Publish.removePublish)
router.post('/adddiscounts', Discounts.addDiscounts);
router.post('/getdiscountsList', Discounts.getDiscountsList);
router.get('/getdiscountscount', Discounts.getDiscountsCount);
router.post('/updatediscounts', Discounts.updateDiscounts);
router.post('/removediscounts', Discounts.removeDiscounts);


export default router;
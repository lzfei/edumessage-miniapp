webpackJsonp([6],{261:function(t,e,n){"use strict";function o(t){c||(n(819),n(821))}Object.defineProperty(e,"__esModule",{value:!0});var i=n(459),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);var l=n(823),s=n.n(l),c=!1,d=n(3),p=o,u=d(a.a,s.a,!1,p,null,null);u.options.__file="src/views/school/school.vue",e.default=u.exports},459:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(99),a=o(i),r=n(100),l=o(r),s=n(9),c=o(s),d=n(98);e.default={name:"school_index",data:function(){var t=this;return{addModal:!1,modal:{visible:!1},loading:!1,index:1,school:{name:"",good:"",score:"4.8",tag1:"",tag2:"",founddate:"",category:[],coordinate:"",coordinates:[]},schoolValidate:{name:[{required:!0,message:"请输入机构名称",trigger:"blur"}],good:[{required:!0,message:"请输入擅长科目",trigger:"blur"},{type:"string",max:20,message:"不能超过20个字符",trigger:"blur"}],tag1:[{required:!0,message:"请输入标签1",trigger:"blur"}],tag2:[{required:!0,message:"请输入标签2",trigger:"blur"}],founddate:[{required:!0,message:"请输入出版年份",trigger:"blur"}],category:[{required:!0,type:"array",min:1,message:"请选择类型",trigger:"blur"}],_coordinate:[{required:!0,message:"请输入坐标",trigger:"blur"}]},editInlineColumns:[{title:"序号",type:"index",width:60,align:"center"},{title:"名称",align:"center",key:"name",width:250,editable:!0},{title:"擅长",align:"center",key:"good",editable:!0},{title:"标签1",align:"center",key:"tag1",editable:!0,width:100},{title:"标签2",align:"center",key:"tag2",editable:!0,width:100},{title:"评分",align:"center",key:"score",width:70},{title:"成立年份",align:"center",key:"founddate",editable:!0,width:90},{title:"操作",align:"center",width:190,key:"handle",render:function(e,n){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.editClick(n)}}},"修改"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){t.remove(n)}}},"删除")])}},{title:"详情",width:70,key:"show_more",align:"center",render:function(e,n){return e("Button",{props:{type:"text",size:"small"},on:{click:function(){var e={_id:n.row._id};t.$router.push({name:"school_info",params:e})}}},"详情")}}],editInlineData:[],currentPage:1,totalCount:0,limit:5,offset:0,isEdit:!1}},computed:{},methods:{initData:function(){this.school={name:"",good:"",score:"4.8",tag1:"",tag2:"",founddate:"",category:[],coordinate:"",coordinates:[]}},getData:function(){function t(){return e.apply(this,arguments)}var e=(0,l.default)(a.default.mark(function t(){var e;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.getSchoolList)({limit:this.limit,offset:this.offset});case 2:e=t.sent,this.editInlineData=e.data;case 4:case"end":return t.stop()}},t,this)}));return t}(),getSchoolCount:function(){function t(){return e.apply(this,arguments)}var e=(0,l.default)(a.default.mark(function t(){var e;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.getSchoolCount)();case 2:e=t.sent,this.totalCount=e.count;case 4:case"end":return t.stop()}},t,this)}));return t}(),addClick:function(){this.isEdit=!1,this.modal.visible=!0},modalOk:function(){this.isEdit?this.edit():this.save()},modalCancel:function(){this.modal.visible=!1,this.$refs.schoolForm.resetFields(),this.getSchoolCount(),this.getData(),this.initData()},save:function(){function t(){return e.apply(this,arguments)}var e=(0,l.default)(a.default.mark(function t(){var e,n,o=this;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=this,n=c.default.get("_id"),this.$refs.schoolForm.validate(function(){var t=(0,l.default)(a.default.mark(function t(n){var i;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=6;break}return e.school.coordinates=e.school.coordinate.split(",").reverse(),t.next=4,(0,d.basicInfo)(e.school);case 4:i=t.sent,1===i.status?(e.modal.visible=!1,e.$Message.success("添加成功!"),e.getSchoolCount(),e.getData(),e.initData()):e.$Message.error(i.message);case 6:case"end":return t.stop()}},t,o)}));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}},t,this)}));return t}(),cancel:function(){_t.initData()},getNextpage:function(t){this.currentPage=t,this.offset=(this.currentPage-1)*this.limit,this.getData()},editClick:function(t){this.isEdit=!0,this.school=t.row;var e=t.row.coordinates.reverse();this.school.coordinate=e[0]+","+e[1],this.modal.visible=!0},edit:function(){function t(){return e.apply(this,arguments)}var e=(0,l.default)(a.default.mark(function t(){var e,n=this;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=this,this.$refs.schoolForm.validate(function(){var t=(0,l.default)(a.default.mark(function t(o){var i;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!o){t.next=5;break}return t.next=3,(0,d.updateSchool)(n.school);case 3:i=t.sent,1===i.status?(e.modal.visible=!1,e.$Message.success("修改成功!"),e.getSchoolCount(),e.getData(),e.initData()):e.$Message.error(i.message);case 5:case"end":return t.stop()}},t,n)}));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}},t,this)}));return t}(),remove:function(){function t(t){return e.apply(this,arguments)}var e=(0,l.default)(a.default.mark(function t(e){var n;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.removeSchool)({_id:e.row._id});case 2:n=t.sent,1===n.status&&(this.$Message.success(n.message),this.getSchoolCount(),this.getData());case 4:case"end":return t.stop()}},t,this)}));return t}(),refresh:function(){this.getSchoolCount(),this.getData()},handleSearch:function(){},handleCancel:function(){}},created:function(){this.getSchoolCount(),this.getData()}}},819:function(t,e,n){var o=n(820);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(15)("1c3d469b",o,!1,{})},820:function(t,e,n){e=t.exports=n(14)(!1),e.push([t.i,"\n.margin-top-8 {\n  margin-top: 8px;\n}\n.margin-top-10 {\n  margin-top: 10px;\n}\n.margin-top-20 {\n  margin-top: 20px;\n}\n.margin-left-10 {\n  margin-left: 10px;\n}\n.margin-bottom-10 {\n  margin-bottom: 10px;\n}\n.margin-bottom-100 {\n  margin-bottom: 100px;\n}\n.margin-right-10 {\n  margin-right: 10px;\n}\n.padding-left-6 {\n  padding-left: 6px;\n}\n.padding-left-8 {\n  padding-left: 5px;\n}\n.padding-left-10 {\n  padding-left: 10px;\n}\n.padding-left-20 {\n  padding-left: 20px;\n}\n.height-100 {\n  height: 100%;\n}\n.height-120px {\n  height: 100px;\n}\n.height-200px {\n  height: 200px;\n}\n.height-492px {\n  height: 492px;\n}\n.height-460px {\n  height: 460px;\n}\n.line-gray {\n  height: 0;\n  border-bottom: 2px solid #dcdcdc;\n}\n.notwrap {\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.padding-left-5 {\n  padding-left: 10px;\n}\n[v-cloak] {\n  display: none;\n}\n.image-editor .cropper {\n  box-sizing: border-box;\n  border: 1px solid #c3c3c3;\n  width: 100%;\n  height: 100%;\n}\n.image-editor .cropper img {\n  max-height: 100%;\n}\n.image-editor .cropper-container {\n  width: 261px!important;\n  height: 276px!important;\n}\n.image-editor .cropper-crop-box {\n  width: 174px!important;\n  height: 184px!important;\n}\n.image-editor .fileinput {\n  display: none;\n}\n.image-editor .filelabel {\n  display: block;\n  padding: 6px 15px;\n  background: #2d8cf0;\n  display: inline-block;\n  border: 1px solid #2d8cf0;\n  border-radius: 4px;\n  cursor: pointer;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  transition: all .2s;\n}\n.image-editor .filelabel:hover {\n  background: #5cadff;\n  border: 1px solid #5cadff;\n  transition: all .2s;\n}\n.image-editor-con {\n  height: 276px;\n  width: 261px!important;\n}\n.image-editor-con-preview-con {\n  width: 174px !important;\n  height: 184px !important;\n  border: 1px solid #c3c3c3;\n}\n.image-editor-con-preview-con #preview {\n  width: 174px;\n  height: 184px;\n  overflow: hidden;\n}\n.image-editor2 .cropper {\n  box-sizing: border-box;\n  border: 1px solid #c3c3c3;\n  width: 100%;\n  height: 100%;\n}\n.image-editor2 .cropper img {\n  max-height: 100%;\n}\n.image-editor2 .cropper-container {\n  width: 261px!important;\n  height: 276px!important;\n}\n.image-editor2 .cropper-crop-box {\n  width: 258px!important;\n  height: 110px!important;\n  margin-left: -24px;\n}\n.image-editor2 .fileinput {\n  display: none;\n}\n.image-editor2 .filelabel {\n  display: block;\n  padding: 6px 15px;\n  background: #2d8cf0;\n  display: inline-block;\n  border: 1px solid #2d8cf0;\n  border-radius: 4px;\n  cursor: pointer;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  transition: all .2s;\n}\n.image-editor2 .filelabel:hover {\n  background: #5cadff;\n  border: 1px solid #5cadff;\n  transition: all .2s;\n}\n.image-editor2-con {\n  height: 276px;\n  width: 261px!important;\n}\n.image-editor2-con-preview-con {\n  width: 174px !important;\n  height: 184px !important;\n  border: 1px solid #c3c3c3;\n}\n#preview2 {\n  width: 174px!important;\n  height: 184px!important;\n  overflow: hidden;\n}\n.admin-upload-list {\n  margin-top: 10px;\n  display: inline-block;\n  width: 140px;\n  height: 75px;\n  text-align: center;\n  line-height: 60px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  overflow: hidden;\n  background: #fff;\n  position: relative;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);\n  margin-right: 4px;\n}\n.admin-upload-list img {\n  width: 100%;\n  height: 100%;\n}\n.admin-upload-list-cover {\n  display: none;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n.admin-upload-list:hover .admin-upload-list-cover {\n  display: block;\n}\n.admin-upload-list-cover i {\n  color: #fff;\n  font-size: 20px;\n  cursor: pointer;\n  margin: 0 2px;\n}\n",""])},821:function(t,e,n){var o=n(822);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(15)("78157f0a",o,!1,{})},822:function(t,e,n){e=t.exports=n(14)(!1),e.push([t.i,"\n.vertical-center-modal {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.ivu-modal {\n  top: 0;\n}\n.page {\n    display: inline-block;\n    float: right;\n}\n",""])},823:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"school"},[n("Row",[n("Col",{attrs:{span:"24"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"ios-list-outline"}}),t._v("\n                    机构列表\n                ")],1),t._v(" "),n("Row",[n("Button",{attrs:{icon:"loop"},on:{click:t.refresh}},[t._v("刷新")]),t._v(" "),n("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入姓名搜搜..."}}),t._v(" "),n("span",{staticStyle:{margin:"0 10px"},on:{click:t.handleSearch}},[n("Button",{attrs:{type:"primary",icon:"search"}},[t._v("搜索")])],1),t._v(" "),n("Button",{attrs:{icon:"android-add-circle"},on:{click:t.addClick}},[t._v("新增")]),t._v(" "),n("Modal",{attrs:{title:"新增机构","class-name":"vertical-center-modal"},model:{value:t.modal.visible,callback:function(e){t.$set(t.modal,"visible",e)},expression:"modal.visible"}},[n("Form",{ref:"schoolForm",attrs:{model:t.school,rules:t.schoolValidate,"label-width":80}},[n("FormItem",{attrs:{label:"名称",prop:"name"}},[n("Input",{attrs:{placeholder:"机构名称"},model:{value:t.school.name,callback:function(e){t.$set(t.school,"name",e)},expression:"school.name"}})],1),t._v(" "),n("FormItem",{attrs:{label:"擅长科目",prop:"good"}},[n("Input",{attrs:{placeholder:"擅长科目 如：英语、奥数"},model:{value:t.school.good,callback:function(e){t.$set(t.school,"good",e)},expression:"school.good"}})],1),t._v(" "),n("FormItem",{attrs:{label:"标签1",prop:"tag1"}},[n("Input",{attrs:{placeholder:"标签 如：门类齐全"},model:{value:t.school.tag1,callback:function(e){t.$set(t.school,"tag1",e)},expression:"school.tag1"}})],1),t._v(" "),n("FormItem",{attrs:{label:"标签2",prop:"tag2"}},[n("Input",{attrs:{placeholder:"标签 如：师资保障"},model:{value:t.school.tag2,callback:function(e){t.$set(t.school,"tag2",e)},expression:"school.tag2"}})],1),t._v(" "),n("FormItem",{attrs:{label:"成立年份",prop:"founddate"}},[n("Input",{attrs:{placeholder:"成立年份 如：2005"},model:{value:t.school.founddate,callback:function(e){t.$set(t.school,"founddate",e)},expression:"school.founddate"}})],1),t._v(" "),n("FormItem",{attrs:{label:"机构类别",prop:"category"}},[n("CheckboxGroup",{model:{value:t.school.category,callback:function(e){t.$set(t.school,"category",e)},expression:"school.category"}},[n("Checkbox",{attrs:{label:"0"}},[t._v("综合")]),t._v(" "),n("Checkbox",{attrs:{label:"1"}},[t._v("幼儿")]),t._v(" "),n("Checkbox",{attrs:{label:"2"}},[t._v("小学")]),t._v(" "),n("Checkbox",{attrs:{label:"3"}},[t._v("初中")]),t._v(" "),n("Checkbox",{attrs:{label:"4"}},[t._v("高中")]),t._v(" "),n("Checkbox",{attrs:{label:"5"}},[t._v("美术")]),t._v(" "),n("Checkbox",{attrs:{label:"6"}},[t._v("舞蹈")]),t._v(" "),n("Checkbox",{attrs:{label:"7"}},[t._v("声乐")]),t._v(" "),n("Checkbox",{attrs:{label:"8"}},[t._v("体育")])],1)],1),t._v(" "),n("FormItem",{attrs:{label:"坐标",prop:"coordinate"}},[n("Input",{attrs:{placeholder:"坐标"},model:{value:t.school.coordinate,callback:function(e){t.$set(t.school,"coordinate",e)},expression:"school.coordinate"}}),t._v(" "),n("a",{attrs:{href:"http://lbs.qq.com/tool/getpoint/index.html",target:"_blank"}},[t._v("获取坐标")])],1)],1),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Button",{attrs:{type:"text",size:"large"},on:{click:t.modalCancel}},[t._v("取消")]),t._v(" "),n("Button",{attrs:{type:"primary",size:"large"},on:{click:t.modalOk}},[t._v("确定")])],1)],1),t._v(" "),n("Page",{staticClass:"page",attrs:{current:t.currentPage,total:t.totalCount,"page-size":t.limit,simple:""},on:{"on-change":t.getNextpage}})],1),t._v(" "),n("Row",{staticClass:"margin-top-10 searchable-table-con1"},[n("div",{staticClass:"edittable-table-height-con"},[n("Table",{attrs:{border:"",columns:t.editInlineColumns,data:t.editInlineData}})],1)])],1)],1)],1)],1)},i=[];o._withStripped=!0;var a={render:o,staticRenderFns:i};e.default=a}});
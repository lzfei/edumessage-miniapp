// 附近功能的collection需运行
db.<yourcollection>.createIndex({ location: '2dsphere' });
db.schools.createIndex({ location: '2dsphere' });
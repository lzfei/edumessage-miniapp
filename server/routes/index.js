'use strict';

import admin from './admin';
import miniapps from './miniapps';
import qiniu from './qiniu';

export default app => {
  app.use('/admin', admin);
  app.use('/miniapps', miniapps);
  app.use('/qiniu', qiniu);
}
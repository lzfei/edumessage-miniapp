import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import route from './routes/index'
import config from 'config-lite';
import history from 'connect-history-api-fallback';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import db from './mongodb/db';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    // res.send(200);
    res.sendStatus(200);
  } else {
    next();
  }
});

const MongoStore = connectMongo(session);

app.use(session({
  name: 'lzfei',
  secret: 'lzf',
  resave: true,
  saveUninitialized: false,
  // cookie: config.session.cookie,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/to'
  })
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(history());
app.use(express.static('./public'));
// app.listen(config.port);

//使用nodejs自带的http、https模块
//根据项目的路径导入生成的证书文件
// var privateKey = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
// var certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
// var credentials = { key: privateKey, cert: certificate };

// var httpsServer = https.createServer(credentials, app);

// var SSLPORT = 3000;
// httpsServer.listen(SSLPORT, function () {
//   console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
// });


app.listen(3000);
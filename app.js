const createError = require('http-errors')
const http = require('http')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const logger = require('./bin/util/logger')
require('dotenv').config()

//router init
const mainRouter = require('./routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
	  secure: false,
  	  httpOnly: true
  }
}))

app.use('/', mainRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = process.env.PORT || '3000'

http.createServer(app).listen(port, () => {
	logger.info(`server listen to ${port}`)
})

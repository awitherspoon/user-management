var express = require('express')
var cookieParser = require('cookie-parser')
var httpProxy = require('http-proxy')
var logger = require('morgan')

// Initialize proxy server and express server/router
var proxy = httpProxy.createProxyServer()
var app = express()
var router = express.Router()

// Prod or dev?
var isProduction = process.env.NODE_ENV === 'production'
console.log(isProduction)
var port = isProduction ? process.env.PORT : 3000

// Routing middleware
app.use('/', express.static(__dirname + '/dist'))
app.use('/api', router)
router.use(cookieParser())
router.use(logger('dev'))
// API sanity check
router.use(function (req, res, next) {
  console.log('API has been called')
  next()
})

if (!isProduction) {
  var bundle = require('./server/bundle.js')
  bundle()
  app.all('*', function (req, res) {
    if (req.url.match('/api')) {
      proxy.web(req, res, {
        target: 'http://localhost:3000'
      })
    }
    if (!req.url.match('/api')) {
      proxy.web(req, res, {
        target: 'http://localhost:8080'
      })
    }
  })
}

proxy.on('error', function () {
  console.log('Could not connect to proxy, please try again...')
})

app.listen(port, function () {
  console.log('Server running on port ' + port)
})

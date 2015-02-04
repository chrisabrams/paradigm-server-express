var argv                 = require('minimist')(process.argv.slice(2)),
    bodyParser           = require('body-parser'),
    fs                   = require('fs'),
    hbs                  = require('hbs'),
    loadHandlebarsExtras = require('paradigm-load-handlebars-extras'),
    morgan               = require('morgan'),
    path                 = require('path'),
    routeCache           = require('route-cache'),
    serveStatic          = require('serve-static'),
    util                 = require('util')

module.exports = (server) => {

  server.set('views', path.join(process.cwd(), './views'))
  server.set('view engine', 'hbs')
  server.engine('hbs', hbs.__express)
  server.use(serveStatic(path.join(process.cwd(), './public')))
  server.use(function(req, res, next) {

    // Express shouldn't be serving these, as serveStatic should be catching them.
    var dontServe = [
      '.css',
      '.ico',
      '.js'
    ]

    dontServe.forEach(function(item) {

      if(req.originalUrl.indexOf(item) > 0) {
        console.error("404:", req.originalUrl)
        res.status(404).send()
      }

    })

    next()

  })

  server.use(bodyParser.json())
  server.use(morgan('combined'))

  // Cache express endpoints for duration of node process while developing
  if((typeof process.env.NODE_ENV == 'undefined' || process.env.NODE_ENV == 'development') && argv.cache) {
    console.log("Route caching enabled.")

    var routeCache = require('route-cache')

    // Cache endpoints for a day
    server.use(routeCache.cacheSeconds(86400))
  }

  loadHandlebarsExtras({
    Handlebars   : hbs,
    helpersPath  : './views/helpers',
    partialsPath : './views/partials'
  })

  require(path.join(process.cwd(), './server/routes'))(server)

}
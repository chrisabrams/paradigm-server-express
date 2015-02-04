require('6to5/register')
require('6to5/polyfill')

var argv    = require('minimist')(process.argv.slice(2)),
    express = require('express')

class ParadigmExpressServer {

  constructor(options) {

    var port   = (process.env.NODE_PORT || options.port || 5050),
        server = express()

    require('./server/config')(server)

    server.listen(port)

    console.log('Express server listening on port:', port)

  }

}

module.exports = ParadigmExpressServer

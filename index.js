'use strict';

var argv    = require('minimist')(process.argv.slice(2)),
    express = require('express')

class ParadigmExpressServer {

  constructor(options) {

    var port = this.port = (options.port || 5050)

    var server = this.server = express()

    require('./server/config')(server, options)

    console.log('Express server listening on port:', port)

  }

  start() {

    this.server = this.server.listen(this.port)

  }

  stop() {

    this.server.close()

  }

  use() {

    this.server.use.apply(this.server, arguments)

  }

}

module.exports = ParadigmExpressServer

var beefy = require('beefy')
  , http = require('http')

http.createServer(beefy({
    entries: ['./public/app.js']
  , cwd: __dirname
  , live: true
  , quiet: false
  , bundlerFlags: ['-t', 'brfs']
  , unhandled: on404
})).listen(8124)

function on404(req, resp) {
  resp.writeHead(404, {})
  resp.end('sorry folks!')
}
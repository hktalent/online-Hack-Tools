'use strict'

var path = require('path'),
    nodeRoot = path.dirname(require.main.filename),
    configPath = path.join(nodeRoot, 'config.json'),
    config = require('read-config')(configPath),
    session = require('express-session')({
    secret: config.session.secret,
    name: config.session.name,
    resave: true,
    secure:true,
    "httpOnly": true,
    saveUninitialized: false,
    unset: 'destroy'
  })

function myWss(app, io)
{
    app.use(session);
    app.get('/rpcDc', function (req, res, next) 
    {
    });
    io.use(function (socket, next) 
    {
        (socket.request.res) ? session(socket.request, socket.request.res, next)
        : next(next);
    });
    io.on('connection', socket);
}

module.exports = { myWss: myWss};
var myapp = require('myapp_51pwn'),
    serverRootPath = __dirname + "/",
    szSSP = serverRootPath + "static/",
    nPort = 444,
    path = require('path'),
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
  }),
    oMyapp = new myapp({
    serverRootPath:serverRootPath,
    webStaticPath:szSSP,
    singleIpMaxConnect:30,
    useHttps:false,
    port:nPort,
    caKey: serverRootPath + '../ca/privkey.pem',
    caCert:serverRootPath + '../ca/fullchain.pem',
    wtHosts:["exploit-poc.com","www.exploit-poc.com","127.0.0.1:" + nPort],
    redisAdapter:{ host: '127.0.0.1', port: 6379 },
    cbkApp:function(app)
    {
        app.get(/\/|.*index.*/, (req, res) => res.sendFile(szSSP + '/index.html'));
    },
    cbk4ServerAppIo:function(server,app,io)
    {
        app.use(session);
        // web socket
        require('./wss').myWss(app,io.of("/rpcDc"));
    },
    onLog:function(s)
    {
        console.log(s);
    }
});


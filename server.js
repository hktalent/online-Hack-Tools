var myapp = require('myapp_51pwn'),
    serverRootPath = __dirname + "/",
    szSSP = serverRootPath + "static/";

var oMyapp = new myapp({
    serverRootPath:serverRootPath,
    webStaticPath:szSSP,
    singleIpMaxConnect:30,
    useHttps:false,
    port:444,
    // caKey:,
    // caCert:,
    wtHosts:["exploit-poc.com","www.exploit-poc.com"],
    redisAdapter:{ host: '127.0.0.1', port: 6379 },
    cbkApp:function(app)
    {
        app.get(/\/|.*index.*/, (req, res) => res.sendFile(szSSP + '/index.html'));
    },
    cbk4ServerAppIo:function(server,app,io)
    {
        // web socket
        require(szSSP + '/wss').myWss(app,io.of("/rpcDc"));
    },
    onLog:function(s)
    {
        console.log(s);
    }
});


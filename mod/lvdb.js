const level = require('level'),request = require('request'),searcher = require('node-ip2region').create(),
    options = {json: true}
// ,qqwry = require('lib-qqwry')();qqwry.speed(); //启用急速模式;

var g_oDb = {};

function getIp(ip,fnCbk,o)
{
    // security check
    if(!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/gmi.test(ip) || '127.0.0.1' == ip || /^192\.168\./gmi.test(ip))return;

    o = o || {"dbName":"ipDb"};
    (g_oDb[o.dbName] = g_oDb[o.dbName] || level(o.dbName)).get(ip,function(err,v)
    {
        if(err)
        {
            // 获取ip归属;qqwry.searchIP(ip)
            v = {"ip":ip};
            // 获取ip 经纬度
            var szUrl = 'http://ip-api.com/json/' + ip;
            // https://api.ip2proxy.com/?key={YOUR_API_KEY}&ip=199.180.115.7&package=PX11&format=json
            request(szUrl, options, (error, res, oRst) => {
                if (!error && res.statusCode == 200) {
                    var a = "status;timezone;query".split(/[;,]/);
                    for(var k in a) {
                        delete oRst[a[k]];
                    }
                    oRst["region"] = searcher.btreeSearchSync(ip)['region'];
                    // 保存ip
                    g_oDb[o.dbName].put(ip,JSON.stringify(oRst));
                    // cbk
                    fnCbk(oRst);
                };
            });
        }
        else fnCbk(JSON.parse(v));
    });
}

function getIps(ips,fnCbk,o)
{
  for(var i in ips)
  {
    getIp(ips[i],fnCbk,o)
  }
}

function getCurNetConn(fnCbk)
{
    var lCmd = require('child_process').execSync(`./mod/getCurNetConn.sh f`).toString("utf8");
    getIps(lCmd.split(/[\n;,]/),fnCbk);
}

getCurNetConn(function(v)
{
    console.log(v);
});
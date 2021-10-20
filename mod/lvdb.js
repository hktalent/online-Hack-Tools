const level = require('level'),request = require('request'),searcher = require('node-ip2region').create(),
    options = {json: true}
    ,qqwry = require('lib-qqwry')();qqwry.speed(); //启用急速模式;

var g_oDb = {};

function getIp(oParm,fnCbk1,o)
{
    if(!oParm)return;
    ip=oParm.ip;
    fnCbk=function(oX){
        oX.pid=oParm.pid;
        oX.cmd=oParm.cmd;
        oX.ip=oParm.ip;
        fnCbk1(oX)
    };
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
                    oRst["date"]=new Date().toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit',hour: '2-digit', hour12: false,minute:'2-digit', second:'2-digit'}).replace(/,[ ]+/gmi,' ');
                    var x1 = qqwry.searchIP(ip);
                    oRst.Country=x1.Country;
                    oRst.Area=x1.Area;
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
    getIp(fnLine2Obj(ips[i]),fnCbk,o)
  }
}

function fnLine2Obj(s)
{
    if(!s)return 0
    var n = s.indexOf(" "),o={'pid':s.substr(0,n)},s=s.substr(n+1);
    n = s.indexOf(" ");
    o.ip=s.substr(0,n);
    o.cmd=s.substr(n+1);
    return o;
}

// 获取本机网络连接
function getCurNetConn(fnCbk)
{
    var lCmd = require('child_process').execSync(`./mod/getCurNetConn.sh f`).toString("utf8").replace(/\/Users\/51pwn/gmi,'$HOME');
    getIps(lCmd.split(/[\n]/),fnCbk);
}

var aOutCols="ip,Country,city,lat,lon,Area,pid,cmd".split(/[;,]/);

// node --trace-uncaught mod/lvdb.js
getCurNetConn(function(v)
{
    console.log(v);
});
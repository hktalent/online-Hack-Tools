var child_process = require("child_process"),
    crypto = require('crypto'),
    o={"tags":"hashing"},
    a=child_process.execSync("openssl list-message-digest-algorithms|awk '{print $1}'||openssl list -digest-algorithms").toString("utf8").toLowerCase().split(/[\n;,]/),
    o1=require("sm3");
for(var i = 0; i < a.length; i++)
{
    if(a[i])
    try{
    (function(x){
        if(x in {
            dsa: '',
            'dsa-sha': '',
            'dsa-sha1': '',
            'dsa-sha1-old': '',
            dss1: '',
            'gost-mac': '',
            streebog512: '',
            streebog256: '',
            md_gost94: '',
            dsawithsha1: '',
            'ecdsa-with-sha1': '',
            'ssl2-md5': ''
          })return;
        o[x]=function(p){return crypto.createHash(x).update(p).digest('hex').toString("utf8")}
    })(a[i]);
    }catch(e){}
}
o['sm3']=function(s){return o1(s)};
module.exports = o;
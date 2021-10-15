var child_process = require("child_process"),
    crypto = require('crypto'),o={"tags":"hashing"},
    a=child_process.execSync("openssl list-message-digest-algorithms|awk '{print $1}'||openssl list -digest-algorithms").toString("utf8").toLowerCase().split(/[\n;,]/),
    o1=require("hash-wasm");
for(var i = 0; i < a.length; i++)
{
    (function(x){
        o[x]=function(a){return crypto.createHash(x).update(a).digest('hex')}
    })(a[i]);
}
for(var k in o1)
{
    if(!o[k])o[k]=o1[k];
}
// console.log(o)
module.exports = o;
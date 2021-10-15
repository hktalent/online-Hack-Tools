module.exports = {
    "url parms to json":function(s){var o = {},a=s.split("&");
    for(var i =0;i<a.length;i++)
    {
        var x=a[i].split("=")
        o[x[0]]=x[1]||"";
    }
    return JSON.stringify(o,null, 2)},
    "json to url parms":function(s)
    {
    var o = JSON.parse(s),a=[];
    for(var k in o)
    {
       a.push(k + "=" + o[k])
    }
    return a.join("&")}
};
fnstr2hex=function(x){return x.replace(/(.)/gim, function (match, grp) 
    {
       var c1=String(grp).charCodeAt(0);
       if(128 > c1)return c1.toString(16);
       return encodeURIComponent(grp).replace(/\%/g,'').toLowerCase()
    } ).toUpperCase();};
function stringFromUTF8Array(data)
{
  const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
  var count = data.length;
  var str = "";
  for (var index = 0;index < count;)
  {
    var ch = data[index++];
    if (ch & 0x80)
    {
      var extra = extraByteMap[(ch >> 3) & 0x07];
      if (!(ch & 0x40) || !extra || ((index + extra) > count))
        return null;
      
      ch = ch & (0x3F >> extra);
      for (;extra > 0;extra -= 1)
      {
        var chx = data[index++];
        if ((chx & 0xC0) != 0x80)
          return null;
        
        ch = (ch << 6) | (chx & 0x3F);
      }
    }
    
    str += String.fromCharCode(ch);
  }
  
  return str;
}

String.prototype.hex2bin = function ()
{
	var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}

String.prototype.bin2hex = function ()
{

	var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result

}

module.exports = {
    "bin2hex_unicode":function(s){return s.bin2hex()},
    "hex_unicode2bin":function(s){return s.hex2bin()},
    "encodeURIComponent":encodeURIComponent,
    "decodeURIComponent":decodeURIComponent,
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
    return a.join("&")},
    "url full decode":function(s)
 {
   s=s.replace(/%/gmi,'');
   var a = [];
   s.replace(/.{2}/gmi,function(j){a.push(parseInt(j,16));return ''});
   return stringFromUTF8Array(a)
 },
    "url full encode":function(s)
 {
   s=fnstr2hex(s)
   x=[]
  s.replace(/[0-9a-fA-F]{2}/gmi,function(a)
  {
      x.push("%" + a)
    return a;
  });
   return x.join('');
 },
 "js full encode":function(s)
 {
   return s.replace(/./gmi,function(a)
   {
      return "\\x" + a.charCodeAt(0).toString(16);
   });
 },
 'js full decode':function(s)
 {
  s = s.replace(/\\x([a-fA-F0-9]{1,6})/gmi,function(a,c)
    {
      return String.fromCharCode(parseInt(c,16));
    });
  s = s.replace(/\\([0-9]{1,6})/gmi,function(a,c)
    {
      return String.fromCharCode(parseInt(c,10));
    });
  // s = s.replace(/)
    return s;//eval(s +s + ";");
 },
 'html full encode':function(s)
 {
   return s.replace(/./gmi,function(a)
        {
            return "&#x" + a.charCodeAt(0).toString(16) + ";";
        });
 },
 'html full decode':function(s)
 {
   //  var elem = document.createElement('textarea');
   // elem.innerHTML = s;
   // s = elem.value;
   // elem=null;
    
    return s.replace(/&#x([a-fA-F0-9]{1,6});/gmi,function(a,c)
        {
            return String.fromCharCode(parseInt(c,16));
        });
 }
};

var a=["./components/file_transfer/File_transfer.js",
"./components/Linux_Shell/ReverseShell.js",
"./components/Linux_Shell/LinuxCommands.js",
"./components/Linux_Shell/PowershellCommands.js",
"./components/Linux_Shell/TtySpawnShell.js",

"./components/encoding/base64.js",
"./components/encoding/Hashing.js",
"./components/encoding/hex.js",
"./components/encoding/URLS.js",
"./components/encoding/URL.js"
];

var s1 = `{"k":"=this is test&","xx":"=999"}`,s, szKey='51pwn.com',aErr={};
for(var k in a)
{
    console.log("test " + a[k]);
    var o = require(a[k]);
    if("tags" in o)
    {
        if("encode" in o)
        {
            s = o['encode'](s1);
            console.log("test " +o['tags'] + " encode: " + s1);
            console.log(s);
            console.log("test " +o['tags'] + " decode: " + s);
            console.log(o['decode'](s));
        }else
        {
            for(var x in o)
            {
                if("tags" != x && "function" == typeof(o[x]) && -1 == x.indexOf('create'))
                {
                    try{
                        var szT1 = o[x](s1);
                        console.log("test " +o['tags'] + " ["+s1 + "] " + x + ": " + szT1);
                    // o[x](s1,szKey,function(kk3){console.log(kk3)})
                }catch(e){
                    aErr[x]='';
                    // console.log(e)
                }
                }
            }
        }
    }
    else if("getCode" in o)
    {
        console.log(o.getCode("exploit-poc",444,'targetPswd.txt'));
    }
    else
    {
        var bD = 0;
        for(var j in o)
        {
            if("function" == typeof o[j])
            {
                console.log("test " + j + "::> " + o[j](s1));
                bD = 1;
            }
        }
        if(!bD)console.log(o)
    }
    console.log("\n================================================================\n");
}

console.log(aErr)
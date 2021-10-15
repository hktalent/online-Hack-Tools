
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
// create markdown
var bMkMarkDow=1,szHost = "exploit-poc.com",nPort = 4444,szFileName = 'targetPswd.txt',szTestStr=`{"k":"=this is test&","xx":"=999"}`;

if(bMkMarkDow)
{
    console.log("## test data info\n```\nHost: " +szHost+ "\nport:" +nPort+ "\nfileName:"+szFileName+"\ntest str:"+szTestStr+"\n```\n");
    for(var k in a)
    {
        var o = require(a[k]),x = a[k].split("/");
        x=x[x.length - 1];
        x = o['tags'] || x.split(".")[0];
        console.log("## " + x);
        for(var i in o)
        {
            if('tags' != i)
            {
                if('getCode' == i)
                {
                    var x6m = o[i](szHost,nPort,szFileName);
                    for(var m in x6m)
                    {
                        console.log('#### ' + m);
                        console.log('```\n' + x6m[m] +'\n```\n');    
                    }
                    
                }
                else console.log("- " + i);
            }
        }
    }
}
// test
else
{
    var s1 = szTestStr,s, szKey='51pwn.com',aErr={};
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
            console.log(o.getCode(szHost,nPort,szFileName));
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
}

var a=["./components/Linux_Shell/ReverseShell.js",
"./components/Linux_Shell/LinuxCommands.js",
"./components/Linux_Shell/PowershellCommands.js"];

for(var k in a)
{
    console.log("test " + a[k]);
    var o = require(a[k]);
    if("getCode" in o)
    {
        console.log(o.getCode("exploit-poc",444));
    }
    else console.log(o)
    console.log("\n================================================================\n");
}
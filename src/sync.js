const child = require('child_process');
const path = require('path');
// Qiniu credentials and bucket name (empty by default; fill with your own keys)
const AK = '';
const SK = '';
const Bucket = '';
// 配置密钥
const qshellPath = path.join(__dirname, '..', 'bin', 'qshell');
// child.execSync(`${qshellPath} account "${AK}" "${SK}" ${Bucket}`);
// 循环同步
const timer = setInterval(function(){
	console.log("sync!");
	try {
                const configPath = path.join(__dirname, '..', 'data', 'localUploadConfig.json');
                child.execSync(`${qshellPath} qupload -c 5 ${configPath}`);
	}catch(e){
		console.log(e);
	}
	
}, 5*60*1000);

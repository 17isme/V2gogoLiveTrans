const child = require('child_process');
const path = require('path');
// Qiniu credentials and bucket name (empty by default; fill with your own keys)
const AK = '';
const SK = '';
const Bucket = '';
// 配置密钥
// child.execSync(`qshell account "${AK}" "${SK}" ${Bucket}`);
// 循环同步
const timer = setInterval(function(){
	console.log("sync!");
	try {
                const configPath = path.join(__dirname, 'localUploadConfig.json');
                child.execSync(`qshell qupload -c 5 ${configPath}`);
	}catch(e){
		console.log(e);
	}
	
}, 5*60*1000);

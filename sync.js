var child = require('child_process');
const AK = "cdrub6Ompxht3mxMs-A5viisVFaepJwS1vWBcAT2";
const SK = "XmnyG6niDI0QFHz_QN-BTkAB1eTKWMQ_KSdCfPfV";
const Bucket = "v2gogo-transport";
// 配置密钥
// child.execSync(`qshell account "${AK}" "${SK}" ${Bucket}`);
// 循环同步
var timer = setInterval(function(){
	console.log("sync!");
	try {
		child.execSync(`qshell qupload -c 5 localUploadConfig.json`);
	}catch(e){
		console.log(e);
	}
	
}, 5*60*1000);
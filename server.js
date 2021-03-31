var child = require('child_process');
var fs = require('fs');
var streamList = fs.readFileSync("./cam.json");
streamList = JSON.parse(streamList);
var runIndex = 0;
var mkGif = function(streamID){
	try{
		var url = `rtsp://172.18.3.50:9090/dss/monitor/param?cameraid=${streamID}%240&substream=3&trackid=801`;
		// 将流转换为mp4
		// if(fs.existsSync(`./sync/${streamID}.mp4`)){
		// 	fs.unlinkSync(`./sync/${streamID}.mp4`);
		// }
		// child.execSync(`ffmpeg -y -i "${url}" -t 5 -vcodec copy -acodec copy -f mp4 "./sync/${streamID}.mp4"`);
		child.execSync(`ffmpeg -y -i "${url}" -t 5 -vf "movie=logo.png [watermark]; [in][watermark] overlay=10:10 [out]" -c:v libx264 -c:a copy -f mp4 "./sync/${streamID}.mp4"`);
		// 将mp4转换为gif
		// if(fs.existsSync(`./sync/${streamID}.gif`)){
		// 	fs.unlinkSync(`./sync/${streamID}.gif`);
		// }
		child.execSync(`ffmpeg -y -ss 0 -t 2 -i "./sync/${streamID}.mp4" -s 480*270 -r 8 "./sync/${streamID}.gif"`);
	} catch (e) {
		console.log(`读取${streamID}时，发生错误。`)
	}
}
var timer = setInterval(function(){
	try {
		mkGif(streamList[runIndex]['code']);
	} catch (e) {
		console.log("读取流错误");
		console.log(e);
	}
	runIndex ++;
	if (runIndex >= streamList.length) {
		runIndex = 0;
	}
}, 10*1000);
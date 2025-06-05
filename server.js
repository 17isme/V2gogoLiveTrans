const child = require('child_process');
const fs = require('fs');
const path = require('path');

const streamList = JSON.parse(fs.readFileSync(path.join(__dirname, 'cam.json')));

// Ensure output directory exists
const syncDir = path.join(__dirname, 'sync');
if (!fs.existsSync(syncDir)) {
    fs.mkdirSync(syncDir);
}

let runIndex = 0;
const mkGif = function (streamID) {
	try{
		var url = `rtsp://172.18.3.50:9090/dss/monitor/param?cameraid=${streamID}%240&substream=3&trackid=801`;
		// 将流转换为mp4
		// if(fs.existsSync(`./sync/${streamID}.mp4`)){
		// 	fs.unlinkSync(`./sync/${streamID}.mp4`);
		// }
		// child.execSync(`ffmpeg -y -i "${url}" -t 5 -vcodec copy -acodec copy -f mp4 "./sync/${streamID}.mp4"`);
                child.execSync(`ffmpeg -y -i "${url}" -t 5 -vf "movie=logo.png [watermark]; [in][watermark] overlay=10:10 [out]" -c:v libx264 -c:a copy -f mp4 "${path.join(syncDir, streamID + '.mp4')}"`);
		// 将mp4转换为gif
		// if(fs.existsSync(`./sync/${streamID}.gif`)){
		// 	fs.unlinkSync(`./sync/${streamID}.gif`);
		// }
                child.execSync(`ffmpeg -y -ss 0 -t 2 -i "${path.join(syncDir, streamID + '.mp4')}" -s 480x270 -r 8 "${path.join(syncDir, streamID + '.gif')}"`);
	} catch (e) {
		console.log(`读取${streamID}时，发生错误。`)
	}
}
function start(interval = 10 * 1000) {
    return setInterval(() => {
        try {
            mkGif(streamList[runIndex]['code']);
        } catch (e) {
            console.log('读取流错误');
            console.log(e);
        }
        runIndex++;
        if (runIndex >= streamList.length) {
            runIndex = 0;
        }
    }, interval);
}

if (require.main === module) {
    start();
}

module.exports = { mkGif, start };

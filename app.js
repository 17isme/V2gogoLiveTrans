const readline = require('readline');
const path = require('path');
const child = require('child_process');
const { mkGif, start } = require('./server');
const cams = require('./cam.json');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let timer = null;

function menu() {
  console.log('\n请选择操作:');
  console.log('1. 生成单个摄像头 GIF');
  console.log('2. 开启循环抓取');
  console.log('3. 手动执行上传');
  console.log('4. 退出');
  rl.question('输入序号: ', handleMenu);
}

function handleMenu(answer) {
  switch (answer.trim()) {
    case '1':
      cams.forEach((c, i) => console.log(`${i + 1}. ${c.code} ${c.address}`));
      rl.question('选择摄像头编号或索引: ', id => {
        const cam = cams[id - 1];
        const code = cam ? cam.code : id;
        mkGif(code);
        console.log('已生成 GIF');
        menu();
      });
      break;
    case '2':
      if (!timer) {
        timer = start();
        console.log('已开始循环抓取，按 Ctrl+C 终止');
      } else {
        console.log('抓取已在运行');
      }
      menu();
      break;
    case '3':
      try {
        const configPath = path.join(__dirname, 'localUploadConfig.json');
        child.execSync(`qshell qupload -c 5 ${configPath}`, { stdio: 'inherit' });
      } catch (e) {
        console.log('上传失败');
      }
      menu();
      break;
    case '4':
      rl.close();
      if (timer) clearInterval(timer);
      break;
    default:
      menu();
  }
}

menu();


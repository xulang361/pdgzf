const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 网站登录后右击检查》打开console>输入 localStorage.getItem('accessToken')  回车下一行显示的就是就是你的accessToken
//改成你的accessToken

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1CJpYXQiOjE3Mjk2MDkxMzUsImV4cCI6MTcyOTY5NTUzNX0.P6gp9EeGrk3dP11_L1m6OSZdpsGeM-BgYy-tnPp3ryo'

// 定义基础 curl 命令
const baseCurlCommand = `curl 'https://select.pdgzf.com/api/v1.0/app/gzf/house/list' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'timestamp: DTKMRU5QZ26TJPX8YXDOOB6TI3LVKWH6' \
  -H 'signature: RYNOFNDRVNE9T8411KQMPN1CR8J64KO5' \
  -H 'Referer: https://select.pdgzf.com/houseLists?id=739711' \
  -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'nonce: 5NC31441XF9YZV9VCQU5JKUU3KY4JSRW' \
  -H 'GZFAuthentication: ${accessToken}' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json' \
  -H 'token: dc2aedfb-b203-4685-9667-9a94e190cb1d'`;

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 执行单个请求的函数
function executeCurl(pageIndex) {
  return new Promise((resolve, reject) => {
    const curlCommand = `${baseCurlCommand} \
      --data-raw '{"where":{"keywords":"","township":null,"projectId":"739711","typeName":null,"rent":null},"pageIndex":${pageIndex},"pageSize":10}'`;

    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`执行出错 (页码 ${pageIndex}): ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr (页码 ${pageIndex}): ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

// 主函数
async function fetchAllPages() {
  const totalPages = 30; // 0 到 23，共24页
  let allData = [];

  for (let i = 0; i < totalPages; i++) {
    try {
      console.log(`正在获取第 ${i} 页数据...`);
      const res = await executeCurl(i);
      const data = JSON.parse(res)
      allData.push(...data.data.data.map(item => {
        return {
          id: item.id,
          fullName: item.fullName,
          rent: item.rent,
          area: item.area,
          url: 'https://select.pdgzf.com/houseDetails?Id=' + item.id
        }
      }));
      
      // 添加 0 - 0.3 之间的随机延迟，除非是最后一页
      if (i < totalPages - 1) {
        const randomDelay = Math.floor(Math.random() * 300);
        console.log(`等待 ${randomDelay} 毫秒...`);
        await delay(randomDelay);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const sortData = allData.sort((a, b) => a.rent - b.rent)

  // 将所有数据保存到文件
  const outputFile = path.join(__dirname, '小区所有房源.json');
  fs.writeFile(outputFile, JSON.stringify(sortData, null, 2), (err) => {
    if (err) {
      console.error(`写入文件时出错: ${err}`);
    } else {
      console.log(`所有数据已保存到: ${outputFile}`);
    }
  });
}

// 执行主函数
fetchAllPages();

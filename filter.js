const { exec } = require('child_process');
const fs = require('fs').promises;

// 改成你的日期
const myDate = '2024-04-10'

async function fetchHouseDetail(houseId) {
  return new Promise((resolve, reject) => {
    const curlCommand = `curl 'https://select.pdgzf.com/api/v1.0/app/gzf/house/${houseId}' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Accept-Language: zh-CN,zh;q=0.9' \
    -H 'Cache-Control: no-cache' \
    -H 'Connection: keep-alive' \
    -H 'Cookie: key_cookie=value; Secure; JSESSIONID=E74F47E080A7CD3C04559AB9E93EA3D2; LeSoft_V9_LoginUserKey=27CF9DAC4962C155FA5775F6597184221F3DC6A88B0A5DFE1F0D108964411A14011B210609458F3BA010C2449EB88AF522D84ADAD197516C7C1659FD1BDA6D0E1A0B589D1C69BF28A36C54B0435B334E3E7DEC6008D8854514287C1913A04E85EC1FBB1A77E9B9259661560E21D651038CFE0CE733F8F7EA03DD26179E9B09A453546D55390733E691B71C7777E90D62CE003906AA082BE033E1B51DB69DE0313627910DED2F21E5FECA9EE7E7DC4A9B4EDBFCB9484A1CFA42721872345D71FC1E50188F5C903BC592AC52DB8063BC3EB258B78793AC96CE35FCEF5A8BB47CC98C0B49F08F9F4E2D5992D8766583509C757DB9AA84097E87A0E5C529C11F22AF540954F48A9497DD45C9E5787AE161B45721CE53A52C4C9D5E633B2673A8EDCABE14E3231F1F66C7C076B2D849573A5950858E3FBA39D1073A4DF01CFD411F1442526CB363AA180305B6A7C4CC939AC689296524478F8CB09DFF3FB1EB25DD647D5366B4AE94A206C80BC31B73BC04C5C6B86FF76647930893BBB071BD313E0C913B2E8C6DBA882257FDB5CA44ED14674FBF4177B17FA7EC2AB2909791C75AC5EA6C35FB1145A8B910B88F7C24DFDB575EC00E6947BE77175619BC2E76C91386; HWWAFSESID=cf7f7732c2a65007bb; HWWAFSESTIME=1729178885123; SECKEY_ABVK=XknAM55KfZf5LIsTnXMmM+eZ7Ak62xUq8kYqLYZvRA9tQzYQE46HpMWKOaCasn4G6xSH5+W2rh4rUtkLXzNViw%3D%3D; userInfo=U2FsdGVkX19lwexFr1pwpuKArIBmZ94IZzAwagkkdSNeGSyjwFk0fx8ziRQDrie2SYuhf5mu/rTrSIb152kW5u6j1Ovo0TMcPJjKzoxaEk3Ym/KE3cUcYTdJai5v99H7c6Qh/zjFP+jeXcFlt7eBH2xdG/oQsRKT9mawQZ6v40pH1NpeX4v1LiojcsGYK2TEXFPMVBfKeCehuSOlLlWtvuJ0zCjTPWQqKBaYKzF7ciIAp3zlyc5FGZ9lGDOLdKbdwCXPMBE8ZFHQ0Ysp3zGRbLu4seOxw5MUsWZZLpGEJtKaWcKUU9gVWN+soOT0/6A31YYaINURzUT0lYX17Kb163rB2CpHUswEstSgiXzTRn05p2A+z9nlRULiQisRI0+D; BMAP_SECKEY=XknAM55KfZf5LIsTnXMmM-eZ7Ak62xUq8kYqLYZvRA-0CLD6vYXNbPmYiZCnMQfkew0ztY6msXkY5Cx0-V5d16DQ-AmO3GKxRI8znirnvVBl-25Vj3T7zC0WNl3DAIcnD6BCvnaXD8cUnRrYzNFsUsvq4rZ-XgMVz5jnPClFUxWaLT9aeqfh6UfaQwyHafBpEcGwzyzeY8LtNCba0YbC3w' \
    -H 'GZFAuthentication: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MzhkMjMzMy04YzAyLTQzMDAtYTAzYi1lZTQzODExZTUzODIiLCJpYXQiOjE3MjkxNzg4MDQsImV4cCI6MTcyOTI2NTIwNH0.c6pphaiu9gdgsrNx2K4Gq3n9YFvz0w28Z8OPeEUo5GI' \
    -H 'Pragma: no-cache' \
    -H 'Referer: https://select.pdgzf.com/houseDetails?Id=${houseId}' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Site: same-origin' \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \
    -H 'nonce: JKBPYYN28FSCIGT2TCMVZLZMP5IZCCYJ' \
    -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'signature: ETWS3ZHV46AUQT36NOQCZE8QQM43NNHP' \
    -H 'timestamp: 3M3H1F6RUIA5S8BQONRLVV8DX8AEDXNQ' \
    -H 'token: dc2aedfb-b203-4685-9667-9a94e190cb1d'`;

    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`执行出错 (页码 ${houseId}): ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr (页码 ${houseId}): ${stderr}`);
      }
      resolve(stdout);
    });
  });
 
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  try {
    // 读取 小区所有房源 文件
    const data = await fs.readFile('小区所有房源.json', 'utf8');
    let allHouseList = JSON.parse(data);

    // 遍历房屋列表并获取详细信息
    for (let i = 0; i < allHouseList.length; i++) {
      const house = allHouseList[i];
      const houseId = house.id;

      if (i > 50) {
        continue;
      }
      
      // 检查 firstDate 字段
      if (house.firstDate && new Date(house.firstDate) < new Date(myDate)) {
        console.log(`跳过房屋 ID ${houseId}，firstDate (${house.firstDate}) 早于 ${myDate}`);
        continue;
      }
      
      const res = await fetchHouseDetail(houseId);
      
      if (!res) {
        console.error(`获取房屋 ID ${houseId} 的详细信息失败`);
        continue;
      }

      let detail;
      try {
        detail = JSON.parse(res);
      } catch (error) {
        console.error(`解析房屋 ID ${houseId} 的详细信息失败:`, error.message);
        continue;
      }


      let firstDate = '2024-10-22';
      if (detail.data.queue && detail.data.queue[0]) {
        firstDate = detail.data.queue[0].qualification.startDate;
      }

      // 将 firstDate 字段添加到当前房屋对象中
      allHouseList[i].firstDate = firstDate;
      console.log('firstDate----', firstDate)

      // 添加延迟以避免请求过于频繁
      await delay(Math.random() * 300 ); // 随机延迟 0 - 300毫秒
    }

    // 将更新后的数据写回文件
    await fs.writeFile('小区所有房源.json', JSON.stringify(allHouseList, null, 2), 'utf8');
    console.log('数据已成功更新并写入文件');
    const filterHouse = allHouseList.filter(item => {
      return new Date(item.firstDate) > new Date(myDate)
    })
    await fs.writeFile('我能排第一的房源.json', JSON.stringify(filterHouse, null, 2), 'utf8');
    console.log('筛选数据已成功更新并写入文件');

  } catch (error) {
    console.error('处理过程中出错:', error.message);
  }
}

main();

/* eslint arrow-body-style:0 */
const oss = require('ali-oss');
const path = require('path');
const fs = require('fs');

const bucket = 'yjy-oss-files';
const accessKeyId = process.env.OSS_ACCESS_KEY_ID;
const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET;

const ossClient = oss({
  bucket,
  endpoint: 'oss-cn-zhangjiakou.aliyuncs.com',
  accessKeyId,
  accessKeySecret,
  time: '120s',
});

const materialPath = path.resolve(__dirname, '../build/materials.json');
const toPath = '/ice-materials/vue-itheima-materials.json';

/**
 * 按照下载量进行排序推荐
 */
function sortScaffoldMaterials() {
  return new Promise((resolve, reject) => {
    const materialsData = JSON.parse(fs.readFileSync(materialPath, 'utf-8'));

    return fs.writeFile(
      materialPath,
      JSON.stringify(materialsData, null, 2),
      'utf-8',
      (err) => {
        if (err) reject(err);
        resolve();
      },
    );
  });
}

console.log('start upload oss', materialPath, toPath);

sortScaffoldMaterials()
  .then(() => {
    return ossClient.put(toPath, materialPath);
  })
  .then((result) => {
    console.log('upload success', result);
  });

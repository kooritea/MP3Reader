# MP3Reader

```javascript
// browser: arrayBuffer = new ArrayBuffer(new Blob())
//nodejs
//import {bufferToArrayBuffer} from '@kooritea-tool/ab-utils'
// arrayBuffer = bufferToArrayBuffer(buffer)
const reader = new MP3Reader(bufferToArrayBuffer(fs.readFileSync('./test.mp3')))

// 更新专辑图，原本有就覆盖，没有就添加
reader.updateAlbumPicture(bufferToArrayBuffer(fs.readFileSync('./album.jpg')))

// 除了专辑图，reader.ID3V2.labels.content也可以修改
// reader.ID3V1 各项也可以修改

// 将修改后的MP3文件导出为ArrayBuffer
fs.writeFileSync('./output-mp3.mp3',Buffer.from(reader.export()))

```
// import {readInt,writeInt,bufferToArrayBuffer, toArrayBuffer, toString, concat, writeHex} from '@kooritea-tool/ab-utils'
// import * as fs from 'fs'
// import { MP3Reader } from './src/MP3Reader'
// import { ID3V2Frame } from './frame/ID3V2'
// import { ID3V1Frame } from './frame/ID3V1'
// import { APETAGEXFrame } from './frame/APETAGEX'
// const arrayBuffer = bufferToArrayBuffer(fs.readFileSync('./test.mp3'))
// const uint8Array = new Uint8Array(arrayBuffer)
// try{
//   const origin = new ID3V2Frame(arrayBuffer)
//   // fs.writeFileSync('./head.mp3',Buffer.from(arrayBuffer.slice(0,origin.size)))
//   // fs.writeFileSync('./body.mp3',Buffer.from(arrayBuffer.slice(origin.size+1)))
//   // console.log(origin.labels)
//   // console.log('mp3size: '+arrayBuffer.byteLength)
//   // console.log('head: '+origin.size)
//   // console.log('labelend: '+origin.endOffset)

//   // origin.labels.forEach((item)=>{
//   //   if(item.frameID === 'APIC'){
//   //     fs.writeFileSync('./output-image',Buffer.from(item.content.pictureBuffer))
//   //   }
//   // })
  
//   // console.log(origin.findLabel('APIC'))
  
//   console.log(origin.labels)
//   const label = origin.findLabel('APIC')
//   // // console.log(label.content.pictureBuffer)
//   // // console.log( bufferToArrayBuffer(fs.readFileSync('./testcover.jpg')))
//   // // label.content.text += "1123sssssssssssssssssssssssss1456"
//   if(label){
//     // console.log(label.content.pictureBuffer.byteLength)
//     label.content.pictureBuffer = bufferToArrayBuffer(fs.readFileSync('./testcover.jpg'))
//     // console.log(label.content.pictureBuffer.byteLength)
//   }else{
//     origin.insertPicture(bufferToArrayBuffer(fs.readFileSync('./testcover.jpg')))
//   }
//   // console.log(origin.size)
//   // // label.content.value += "121231200000000000003"
//   // // console.log(writeHex(new ArrayBuffer(2),0,[0xff,0xd9]))
//   fs.writeFileSync('./output-mp3.mp3',Buffer.from(origin.export()))
  
//   const ID3V2 = new ID3V2Frame(bufferToArrayBuffer(fs.readFileSync('./output-mp3.mp3')))
//   ID3V2.labels.forEach((item)=>{
//     if(item.frameID === 'APIC'){
//       fs.writeFileSync('./output-image',Buffer.from(item.content.pictureBuffer))
//     }
//   })
//   // console.log(ID3V2.size)
//   // console.log(ID3V2.size)
//   // console.log(ID3V2.findLabel('APIC'))
// }catch(e){
//   console.error(e)
// }
// try{
//   // console.log((new ID3V1Frame(arrayBuffer)))
// }catch(e){
//   // console.log(e.message)
// }

// const a = toArrayBuffer("xzcas",'utf16le',true)
// const b = toArrayBuffer("abcd",'utf16le',true)
// console.log(a)
// console.log(b)
// console.log(concat(a,b,a))
// console.log(b)
// const strb = toString(b,'utf16le',true)
// console.log(strb)
// console.log(strb.length)

// writeInt(b,2,1,)
// const a = writeHex(new ArrayBuffer(2),0,[0xff,0xd8])
// console.log(a)
// console.log(readInt(a,0,2))

// console.log(readInt(a,0,4))
// console.log(writeInt(new ArrayBuffer(4),0,4,82789))

// const a = writeHex(new ArrayBuffer(4),0,[0,0x01,0x5b,0x58])
// console.log(a)
// const view = new Uint8Array(a)
// console.log(view)
// let result = 0
// for(let i=0;i<view.byteLength;i++){
//   view[i] = view[i]&0x7f;
// }
// result = view[0]*0x200000+view[1]*0x4000+view[2]*0x80+view[3]
// console.log(view)
// console.log(result)

// const size = 196352

// const bufferView = new Uint8Array(new ArrayBuffer(4))
// let a = Math.floor(size/0x200000)
// writeInt(bufferView,0,1,a)
// let b = Math.floor((size - a*0x200000)/0x4000)
// writeInt(bufferView,1,1,b)
// let c = Math.floor((size - a*0x200000 - b*0x4000)/0x80)
// writeInt(bufferView,2,1,c)
// let d =  Math.floor((size - a*0x200000 - b*0x4000 - c*0x80))
// writeInt(bufferView,3,1,d)
// console.log(bufferView.buffer)

// const a = concat(
//   Buffer.from("abc",'utf16le'),
//   new ArrayBuffer(2),
//   Buffer.from("def",'utf16le'),
//   // new ArrayBuffer(2)
// )
// console.log(a)
// console.log(toString(a,'utf16le'))
// console.log(toString(a,'utf16le').length)
// console.log(toString(a,'utf16le',true))
// console.log(toString(a,'utf16le',true).length)

// const reader = new MP3Reader(bufferToArrayBuffer(fs.readFileSync('./test.mp3')))
// reader.updateAlbumPicture(bufferToArrayBuffer(fs.readFileSync('./testcover.jpg')))
// fs.writeFileSync('./output-mp3.mp3',Buffer.from(reader.export()))
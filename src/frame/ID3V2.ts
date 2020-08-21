import {readInt,writeInt,toString,toArrayBuffer, sliceToZero, concat} from '@kooritea-tool/ab-utils'

/**
 * 标签帧  
 * 每个标签帧都由一个10个字节的帧头和至少 1个字节的不固定长度的帧内容(长度为对象的size属性)组成
 */
class ID3V2Label{

  public frameID:string
  /**
   * content的长度，整个帧长为size+10
   */
  public size:number
  public flags:number
  public content:any

  /**
   * 整个标签的buffer
   */
  public raw:ArrayBuffer

  /**
   * 请传入整个MP3的ArrayBuffer
   * @param arrayBuffer 
   */
  public load(arrayBuffer:ArrayBuffer,start:number){
    this.frameID = toString(arrayBuffer.slice(start,start+4))
    this.size = readInt(arrayBuffer,start+4,4)
    this.flags = readInt(arrayBuffer,start+8,2)
    this.content = this.decodeContent(arrayBuffer.slice(start+10,start+10+this.size))
    this.raw = arrayBuffer.slice(start,start+this.size+10)
  }

  protected decodeContent(contentArrayBuffer:ArrayBuffer):any{}

  protected decodeTextContent(contentArrayBuffer:ArrayBuffer):{
    encode: number,
    text: string
  }{
//  0：表示帧内容字符用 ISO-8859-1 编码；
//  1：表示帧内容字符用 UTF-16LE 编码；
//  2：表示帧内容字符用 UTF-16BE 编码；
//  3：表示帧内容字符用 UTF-8 编码（仅ID3V2.4才支持）
    const encode = readInt(contentArrayBuffer,0,1)
    contentArrayBuffer = contentArrayBuffer.slice(1)
    try{
      return {
        encode,
        text:toString(contentArrayBuffer,this.getEncodeType(encode),true)
      }
    }catch(e){
      return {
        encode,
        text:  contentArrayBuffer.toString()
      }
    }
  }

  protected toHeaderArratBuffer():ArrayBuffer{
    return concat(
      toArrayBuffer(this.frameID,'ascii'),
      writeInt(new ArrayBuffer(4),0,4,this.size),
      writeInt(new ArrayBuffer(2),0,2,this.flags)
    )
  }

  public toArratBuffer():ArrayBuffer{
    return this.raw
  }

  protected getEncodeType(index:number):'ascii'|'utf16le'|'utf16be'{
    switch(index){
      case 0:
        return 'ascii'
      case 1:
        return 'utf16le'
      case 2:
        return 'utf16be'
      default:
        throw new Error('unsupport encode: '+index)
    }
  }
}

class APIC extends ID3V2Label{

  public content:{
    descriptionEncode: number
    mime: string
    pictureType: number
    description: string
    pictureBuffer: ArrayBuffer
  }

  protected decodeContent(contentArrayBuffer:ArrayBuffer){
    const descriptionEncode = readInt(contentArrayBuffer,0,1) // 下面描述信息的编码 0或1 ascii/utf16 
    contentArrayBuffer = contentArrayBuffer.slice(1)
    const mimeBuffer = sliceToZero(contentArrayBuffer,0,'ascii')
    const mime = toString(mimeBuffer,'ascii')
    contentArrayBuffer = contentArrayBuffer.slice(mimeBuffer.byteLength+1)
    const pictureType = readInt(contentArrayBuffer,0,1,1)
    contentArrayBuffer = contentArrayBuffer.slice(1)
    const description = toString(sliceToZero(contentArrayBuffer,0,descriptionEncode === 0?'ascii':'utf16'),this.getEncodeType(descriptionEncode))
    contentArrayBuffer = contentArrayBuffer.slice(description.length*(descriptionEncode+1) + (descriptionEncode+1))
    return {
      descriptionEncode,
      mime,
      pictureType,
      description,
      pictureBuffer:contentArrayBuffer,
    }
  }

  public toArratBuffer():ArrayBuffer{
    const body = this.toBodyArratBuffer()
    this.size = body.byteLength
    const head = this.toHeaderArratBuffer()
    return concat(
      head,
      body
    )
  }

  private toBodyArratBuffer():ArrayBuffer{
    return concat(
      writeInt(new ArrayBuffer(1),0,1,this.content.descriptionEncode),
      toArrayBuffer(this.content.mime,'ascii',false,true),
      writeInt(new ArrayBuffer(1),0,1,this.content.pictureType),
      this.content.description?toArrayBuffer(this.content.description,this.getEncodeType(this.content.descriptionEncode),false,true):new ArrayBuffer(1),
      this.content.pictureBuffer
    )
  }

  public static create(pictureBuffer:ArrayBuffer,description:string = ''):APIC{
    const apic = new APIC()
    let mime = ""
    switch(readInt(pictureBuffer,0,2)){
      case 35152:
        mime = 'image/png'
        break
      case 65496:
        mime = 'image/jpeg'
        break
      default:
        mime = 'image/jpeg'
    }
    apic.frameID = "APIC"
    apic.flags = 0
    apic.content = {
      descriptionEncode: 0,
      mime,
      pictureType: 3,
      description: description,
      pictureBuffer: pictureBuffer,
    }
    apic.size = apic.toBodyArratBuffer().byteLength
    return apic
  }
}

// let isEng = false
// if(toString(contentArrayBuffer.slice(0,3),'ascii') === 'eng'){
//   contentArrayBuffer = contentArrayBuffer.slice(3)
//   isEng = true
// }

class COMM extends ID3V2Label{
  public content:{
    encode: number
    language: string
    shortContent: string
    text: string
  } | undefined

  protected decodeContent(contentArrayBuffer:ArrayBuffer){
    const encode = readInt(contentArrayBuffer,0,1)
    contentArrayBuffer = contentArrayBuffer.slice(1)
    const encodeType = encode === 0?'ascii':'utf16'
    const width = encode === 0?1:2
    const language = toString(contentArrayBuffer.slice(0,3),'ascii')
    contentArrayBuffer = contentArrayBuffer.slice(3)
    let descripBuffer = sliceToZero(contentArrayBuffer,0,encodeType)
    contentArrayBuffer = contentArrayBuffer.slice(descripBuffer.byteLength+width)
    let shortContent = toString(descripBuffer,this.getEncodeType(encode),true)
    const text = toString(contentArrayBuffer,this.getEncodeType(encode),true)
    return {
      encode,
      language,
      shortContent,
      text
    }
  }

  public toArratBuffer():ArrayBuffer{
    const body = concat(
      writeInt(new ArrayBuffer(1),0,1,this.content.encode),
      toArrayBuffer(this.content.language,'ascii',false,false),
      toArrayBuffer(this.content.shortContent,this.getEncodeType(this.content.encode),true,true),
      toArrayBuffer(this.content.text,this.getEncodeType(this.content.encode),true,true)
    )
    this.size = body.byteLength
    return concat(
      this.toHeaderArratBuffer(),
      body
    )
  }
}

class TXXX extends ID3V2Label{
  public content:{
    encode: number
    key: string
    value: string
  } | undefined

  protected decodeContent(contentArrayBuffer:ArrayBuffer){
    const encode = readInt(contentArrayBuffer,0,1)
    contentArrayBuffer = contentArrayBuffer.slice(1)
    const encodeType = encode === 0?'ascii':'utf16'
    const width = encode === 0?1:2
    let keyab:ArrayBuffer = sliceToZero(contentArrayBuffer,0,encodeType)
    let valueab:ArrayBuffer = sliceToZero(contentArrayBuffer.slice(keyab.byteLength+width),0,encodeType)
    let key = toString(keyab,this.getEncodeType(encode))
    let value = toString(valueab,this.getEncodeType(encode))
    return {
      encode,
      key,
      value
    }
  }

  public toArratBuffer():ArrayBuffer{
    const body = concat(
      writeInt(new ArrayBuffer(1),0,1,this.content.encode),
      toArrayBuffer(this.content.key,this.getEncodeType(this.content.encode),true,true),
      toArrayBuffer(this.content.value,this.getEncodeType(this.content.encode),true,true)
    )
    this.size = body.byteLength
    return concat(
      this.toHeaderArratBuffer(),
      body
    )
  }
}

class TextInformation extends ID3V2Label{
  public content: {
    encode: number;
    text: string;
  }

  protected decodeContent(contentArrayBuffer:ArrayBuffer){
    return this.decodeTextContent(contentArrayBuffer)
  }

  public toArratBuffer():ArrayBuffer{
    const body = concat(
      writeInt(new ArrayBuffer(1),0,1,this.content.encode),
      toArrayBuffer(this.content.text,this.getEncodeType(this.content.encode),true,true)
    )
    this.size = body.byteLength
    return concat(
      this.toHeaderArratBuffer(),
      body
    )
  }
}

export class ID3V2Frame{

  public version:1|2|3|4
  public revision:number
  public flag:number
  /**
   * labels的大小
   */
  public size:number
  public labels:Array<ID3V2Label> = []
  public endOffset:number
  public mp3:ArrayBuffer

  constructor(arrayBuffer:ArrayBuffer){
    if(toString(arrayBuffer.slice(0,3)) === 'ID3'){
      // 存在ID3V2头，ID3V2有4个版本
      this.version = <1|2|3|4>readInt(arrayBuffer,3,1)
      this.revision = readInt(arrayBuffer,4,1)
      if(this.version === 3){
        this.mp3 = arrayBuffer
        this.flag = readInt(arrayBuffer,5,1)
        const sizeView = new Uint8Array(arrayBuffer.slice(6,10))
        for(let i=0;i<sizeView.byteLength;i++){
          sizeView[i] = sizeView[i]&0x7f;
        }
        this.size = sizeView[0]*0x200000+sizeView[1]*0x4000+sizeView[2]*0x80+sizeView[3]
        let i = 10
        while(i < (10 + this.size)){
          if(readInt(arrayBuffer,i,4) === 0){
            break
          }
          const frameID = toString(arrayBuffer.slice(i,i+4))
          let label:ID3V2Label
          if(frameID === 'TXXX'){
            label = new TXXX()
          }else if(frameID === 'APIC'){
            label = new APIC()
          }else if(frameID === 'COMM'){
            label = new COMM()
          }else if(frameID[0] === 'T'){
            label = new TextInformation()
          }else{
            label = new ID3V2Label()
          }
          label.load(arrayBuffer,i)
          this.labels.push(label)
          i = i+(label.size + 10)
        }
        this.endOffset = i
      }else {
        throw new Error("unspport ID3V2 version: " + this.version)
      }
    }else{
      throw new Error("ID3V2 frame not found")
    }
  }

  public insertPicture(pictureBuffer:ArrayBuffer,description:string = ''){
    const apic = APIC.create(pictureBuffer,description)
    this.labels.push(apic)
  }
  public export():ArrayBuffer{
    const header = concat(
      toArrayBuffer("ID3",'ascii'),
      writeInt(new ArrayBuffer(1),0,1,this.version),
      writeInt(new ArrayBuffer(1),0,1,this.revision),
      writeInt(new ArrayBuffer(1),0,1,this.flag),
      new ArrayBuffer(4),// size
      ...this.labels.map((label)=>{
        return label.toArratBuffer()
      }),
    )

    /**
     * header里面定义的size包括了头、所有标签，还有一段使用
     */
    const mp3Body = this.mp3.slice(this.size+10)
    this.size = header.byteLength - 10

    let a = Math.floor(this.size/0x200000)
    writeInt(header,6,1,a)
    let b = Math.floor((this.size - a*0x200000)/0x4000)
    writeInt(header,7,1,b)
    let c = Math.floor((this.size - a*0x200000 - b*0x4000)/0x80)
    writeInt(header,8,1,c)
    let d =  Math.floor((this.size - a*0x200000 - b*0x4000 - c*0x80))
    writeInt(header,9,1,d)
    return concat(
      header,
      mp3Body
    )
  }

  public findLabel(name:string){
    for(let item of this.labels){
      if(item.frameID === name){
        return item
      }
    }
  }
}
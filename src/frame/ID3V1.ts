import { toString, readInt, concat, toArrayBuffer, writeInt } from "@kooritea-tool/ab-utils"

export class ID3V1Frame{

  public title:string
  public artist:string
  public album:string
  public year:string
  public comment:string
  public reserved:number
  public track:number
  public genre:number


  constructor(arrayBuffer:ArrayBuffer){
    const frameArrayBuffer = arrayBuffer.slice(arrayBuffer.byteLength - 128)
    if(toString(frameArrayBuffer.slice(0,3)) === 'TAG'){
      this.title = toString(frameArrayBuffer.slice(3,33),'ascii',true)
      this.artist = toString(frameArrayBuffer.slice(33,63),'ascii',true)
      this.album = toString(frameArrayBuffer.slice(63,93),'ascii',true)
      this.year = toString(frameArrayBuffer.slice(93,97),'ascii',true)
      this.comment = toString(frameArrayBuffer.slice(97,125),'ascii',true)
      this.reserved = readInt(frameArrayBuffer,125,1)
      if(this.reserved === 0){
        this.track = readInt(frameArrayBuffer,126,1)
      }else{
        this.track = 0
        this.comment = toString(frameArrayBuffer.slice(97,127),'ascii',true)
      }
      this.genre = readInt(frameArrayBuffer,127,1)
    }else{
      throw new Error("ID3V1 frame not found")
    }
  }

  public export(){
    return concat(
      toArrayBuffer('TAG','ascii',false,false,3),
      toArrayBuffer(this.title,'ascii',false,false,30),
      toArrayBuffer(this.artist,'ascii',false,false,30),
      toArrayBuffer(this.album,'ascii',false,false,30),
      toArrayBuffer(this.year,'ascii',false,false,4),
      toArrayBuffer(this.comment,'ascii',false,false,this.reserved === 0?28:30),
      this.reserved === 0?writeInt(new ArrayBuffer(1),0,1,0):new ArrayBuffer(0),
      this.reserved === 0?writeInt(new ArrayBuffer(1),0,1,this.track):new ArrayBuffer(0),
      writeInt(new ArrayBuffer(1),0,1,this.genre)
    )
  }
  
}
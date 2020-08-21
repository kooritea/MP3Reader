import { ID3V2Frame } from './frame/ID3V2'
import { ID3V1Frame } from './frame/ID3V1'
import { concat } from '@kooritea-tool/ab-utils'

export default class MP3Reader{

  public ID3V2:ID3V2Frame
  public ID3V1:ID3V1Frame
  private body:ArrayBuffer

  constructor(arrayBuffer:ArrayBuffer){
    this.ID3V2 = new ID3V2Frame(arrayBuffer)
    this.body = arrayBuffer.slice(this.ID3V2.size+10)
    try{
      this.ID3V1 = new ID3V1Frame(arrayBuffer)
      this.body = this.body.slice(0,this.body.byteLength - 128)
    }catch(e){
      console.error(e)
    }
  }

  public updateAlbumPicture(arrayBuffer:ArrayBuffer){
    const label = this.ID3V2.findLabel('APIC')
    if(label){
      label.content.pictureBuffer = arrayBuffer
    }else{
      this.ID3V2.insertPicture(arrayBuffer)
    }
  }

  public export():ArrayBuffer{
    return concat(
      this.ID3V2.export(),
      this.body,
      this.ID3V1?this.ID3V1.export():new ArrayBuffer(0)
    )
  }
}
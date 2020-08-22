import { ID3V2Frame } from './frame/ID3V2';
import { ID3V1Frame } from './frame/ID3V1';
export declare class MP3Reader {
    ID3V2: ID3V2Frame;
    ID3V1: ID3V1Frame;
    private body;
    constructor(arrayBuffer: ArrayBuffer);
    updateAlbumPicture(arrayBuffer: ArrayBuffer): void;
    export(): ArrayBuffer;
}

/**
 * 标签帧
 * 每个标签帧都由一个10个字节的帧头和至少 1个字节的不固定长度的帧内容(长度为对象的size属性)组成
 */
declare class ID3V2Label {
    frameID: string;
    /**
     * content的长度，整个帧长为size+10
     */
    size: number;
    flags: number;
    content: any;
    /**
     * 整个标签的buffer
     */
    raw: ArrayBuffer;
    /**
     * 请传入整个MP3的ArrayBuffer
     * @param arrayBuffer
     */
    load(arrayBuffer: ArrayBuffer, start: number): void;
    protected decodeContent(contentArrayBuffer: ArrayBuffer): any;
    protected decodeTextContent(contentArrayBuffer: ArrayBuffer): {
        encode: number;
        text: string;
    };
    protected toHeaderArratBuffer(): ArrayBuffer;
    toArratBuffer(): ArrayBuffer;
    protected getEncodeType(index: number): 'ascii' | 'utf16le' | 'utf16be';
}
export declare class ID3V2Frame {
    version: 1 | 2 | 3 | 4;
    revision: number;
    flag: number;
    /**
     * labels的大小
     */
    size: number;
    labels: Array<ID3V2Label>;
    endOffset: number;
    mp3: ArrayBuffer;
    constructor(arrayBuffer: ArrayBuffer);
    insertPicture(pictureBuffer: ArrayBuffer, description?: string): void;
    export(): ArrayBuffer;
    findLabel(name: string): ID3V2Label;
}
export {};

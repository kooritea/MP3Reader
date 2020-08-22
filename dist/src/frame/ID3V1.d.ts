export declare class ID3V1Frame {
    title: string;
    artist: string;
    album: string;
    year: string;
    comment: string;
    reserved: number;
    track: number;
    genre: number;
    constructor(arrayBuffer: ArrayBuffer);
    export(): ArrayBuffer;
}

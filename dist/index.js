!function webpackUniversalModuleDefinition(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.MP3Reader=r():e.MP3Reader=r()}(this,function(){return c=[function(module,exports,__webpack_require__){!function webpackUniversalModuleDefinition(e,r){module.exports=r()}(0,function(){return v={"./ sync recursive":
/*!**************!*\
  !*** . sync ***!
  \**************/
/*! no static exports found */function(module,exports){eval('function webpackEmptyContext(req) {\n\tvar e = new Error("Cannot find module \'" + req + "\'");\n\te.code = \'MODULE_NOT_FOUND\';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = "./ sync recursive";\n\n//# sourceURL=webpack://ABUtils/._sync?')},"./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */function(module,exports,__webpack_require__){eval('var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {\n    if ( true && typeof module.exports === "object") {\n        var v = factory(__webpack_require__("./ sync recursive"), exports);\n        if (v !== undefined) module.exports = v;\n    }\n    else if (true) {\n        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === \'function\' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    }\n})(function (require, exports) {\n    "use strict";\n    Object.defineProperty(exports, "__esModule", { value: true });\n    exports.concat = exports.bufferToArrayBuffer = exports.sliceToZero = exports.toArrayBuffer = exports.toString = exports.utf16beToUTF16le = exports.writeHex = exports.writeInt = exports.readInt = void 0;\n    var getView = function (buffer, view) {\n        if (buffer.byteLength % view !== 0) {\n            throw new Error("param view error: buffer.byteLength % view !== 0");\n        }\n        switch (view) {\n            case 1:\n                return new Uint8Array(buffer);\n            case 2:\n                return new Uint16Array(buffer.slice(0, buffer.byteLength - (buffer.byteLength % 2)));\n            case 4:\n                return new Uint32Array(buffer);\n            default:\n                throw new Error("param view error");\n        }\n    };\n    /**\n     * 读取10进制正整数\n     * @param buffer\n     * @param start 从0开始,单位为view，比如view为4的时候，start为1表示从第5个字节(第33个二进制位)开始读取长度len*view个字节\n     * @param len 所读整数占的长度，占位越长可能的值越大.\n     * @param view 将多少字节视为一个单位，分别对应Uint8Array|Uint16Array|Uint32Array\n     */\n    exports.readInt = function (buffer, start, len, view) {\n        if (view === void 0) { view = 1; }\n        var bufferView = getView(buffer, view);\n        var result = 0;\n        for (var i = len - 1; i >= 0; i--) {\n            result += Math.pow(Math.pow(2, 8 * view), len - i - 1) * bufferView[start + i];\n        }\n        return result;\n    };\n    /**\n     * 写入无符号10进制正整数\n     * 会直接修改传入的arraybuffer\n     * 请注意，如果写入长度大于一，将以大端在左的方式写入\n     * @param buffer ArrayBuffer或bufferView，传入bufferView时view参数无效\n     * @param start 从0开始,单位为view，比如view为4的时候，start为1表示从第5个字节(第33个二进制位)开始读取长度len*view个字节\n     * @param len 该整数所占长度\n     * @param value 10进制正整数 最大可写入的整数为2^(8*view*len)-1\n     * @param view 将多少字节视为一个单位，默认为Uint8Array，分别对应Uint8Array|Uint16Array|Uint32Array\n     * @return ArrayBuffer 返回传入的arraybuffer引用\n     */\n    exports.writeInt = function (buffer, start, len, value, view) {\n        if (view === void 0) { view = 1; }\n        var bufferView;\n        if (buffer instanceof ArrayBuffer) {\n            bufferView = getView(buffer, view);\n        }\n        else {\n            bufferView = buffer;\n        }\n        if (value > (Math.pow(2, len * 8 * view) - 1)) {\n            throw new Error("Cannot write Int greater than 2^" + len * 8 + "-1: " + value);\n        }\n        if (bufferView.length < start + len) {\n            throw new Error("Cannot write an Int of length " + len + " at position " + start + ",because the input bufferView length is " + bufferView.length);\n        }\n        var i = 0;\n        while (i < len) {\n            bufferView[start + i] = value / Math.pow(Math.pow(2, 8 * view), len - i - 1);\n            i++;\n        }\n        return buffer;\n    };\n    exports.writeHex = function (target, start, values) {\n        var view = new Uint8Array(target);\n        for (var i = start; i < target.byteLength; i++) {\n            view[i] = values[i - start];\n        }\n        return target;\n    };\n    exports.utf16beToUTF16le = function (utf16be) {\n        var utf16le = new Uint8Array(utf16be.length);\n        for (var i = 0; i < utf16be.length + 2; i = i + 2) {\n            utf16le[i] = utf16be[i + 1];\n            utf16le[i + 1] = utf16be[i];\n        }\n        return utf16le;\n    };\n    /**\n     * 此方法会清除位于前面的字符顺序标记(只有utf16或传入Uint16Array才可能会有)\n     * @param arrayBuffer ArrayBuffer或者view\n     * @param encode 传入view时该项无效，ascii使用Uint8Array utf16使用Uint16Array\n     * @param cleanZero 是否清除非结尾的0,结尾的0会被删除\n     */\n    exports.toString = function (arrayBuffer, encode, cleanZero) {\n        if (encode === void 0) { encode = \'ascii\'; }\n        if (cleanZero === void 0) { cleanZero = false; }\n        var dataString = "";\n        var bufferView;\n        if (arrayBuffer instanceof ArrayBuffer) {\n            if (encode === \'ascii\') {\n                bufferView = getView(arrayBuffer, 1);\n            }\n            else if (encode === \'utf16le\') {\n                bufferView = getView(arrayBuffer, 2);\n                if (exports.readInt(arrayBuffer, 0, 2, 1) === 65534) { // ff fe\n                    bufferView = bufferView.slice(1);\n                }\n                // utf16 要去除前两个判断高地位顺序的字节\n            }\n            else if (encode === \'utf16be\') {\n                bufferView = exports.utf16beToUTF16le(getView(arrayBuffer, 1));\n                bufferView = getView(bufferView.buffer, 2);\n                if (exports.readInt(arrayBuffer, 0, 2, 1) === 65279) {\n                    bufferView = bufferView.slice(1);\n                }\n            }\n            else {\n                throw new Error("unsupport encode: " + encode);\n            }\n        }\n        else {\n            bufferView = arrayBuffer;\n            if (bufferView instanceof Uint16Array && (bufferView[0] === 0xFFFE || bufferView[0] === 0xFEFF)) {\n                bufferView = bufferView.slice(1);\n            }\n        }\n        for (var i = 0; i < bufferView.length; i++) {\n            if (bufferView[i] === 0 && cleanZero && i < bufferView.length - 2) {\n                continue;\n            }\n            if (i >= bufferView.length - 2 && bufferView[i] === 0) {\n                continue;\n            }\n            dataString += String.fromCharCode(bufferView[i]);\n        }\n        // console.log(dataString)\n        return dataString;\n    };\n    /**\n     * 字符串转arrayBuffer\n     * utf16编码时会添加字节顺序标记\n     * js默认使用小端在前(utf16le)\n     * @param str\n     * @param encode\n     * @param addBOM default false 添加fffe或feff的字节顺序控制符(只用utf16le/utf16be编码有效) 当str不为空字符串才有效\n     * @param addEnd default false 添加0或00的结束控制字符\n     * @param fixLen 固定输出的字节长度，长度不足时补0，超出时报错\n     */\n    exports.toArrayBuffer = function (str, encode, addBOM, addEnd, fixLen) {\n        if (addBOM === void 0) { addBOM = false; }\n        if (addEnd === void 0) { addEnd = false; }\n        var bufferView;\n        if (encode === \'ascii\') {\n            bufferView = new Uint8Array(str.length + (addEnd ? 1 : 0));\n            for (var i = 0; i < str.length; i++) {\n                exports.writeInt(bufferView, i, 1, str.charCodeAt(i));\n            }\n        }\n        else if (encode === \'utf16le\') {\n            // 小端在前\n            bufferView = new Uint8Array(str.length * 2 + (addBOM ? 2 : 0) + (addEnd ? 2 : 0));\n            if (addBOM && str.length > 0) {\n                bufferView[0] = 0xFE;\n                bufferView[1] = 0xFF;\n            }\n            // 因为writeInt写入是大端在前，之后统一反转\n            for (var i = 0; i < str.length; i++) {\n                exports.writeInt(bufferView, i * 2 + 2, 2, str.charCodeAt(i));\n            }\n            bufferView = exports.utf16beToUTF16le(bufferView);\n        }\n        else if (encode === \'utf16be\') {\n            // 大端在前\n            bufferView = new Uint8Array(str.length * 2 + (addBOM ? 2 : 0) + (addEnd ? 2 : 0));\n            if (addBOM && str.length > 0) {\n                bufferView[0] = 0xFE;\n                bufferView[1] = 0xFF;\n            }\n            // 因为之后需要le转换\n            for (var i = 0; i < str.length; i++) {\n                exports.writeInt(bufferView, i * 2 + 2, 2, str.charCodeAt(i));\n            }\n        }\n        else {\n            throw new Error("unsupport encode: " + encode);\n        }\n        if (typeof fixLen === \'number\') {\n            if (bufferView.buffer.byteLength <= fixLen) {\n                return exports.concat(bufferView.buffer, new ArrayBuffer(fixLen - bufferView.buffer.byteLength));\n            }\n            else {\n                throw new Error("String Buffer length is greater than fixLen");\n            }\n        }\n        else {\n            return bufferView.buffer;\n        }\n    };\n    /**\n     * 从指定地方开始截取到0x00或0x0000为止\n     * 不会清除字节顺序标记\n     * 返回的arraybuffer不包括最后的0x00 或0x0000\n     * @param arrayBuffer\n     * @param start\n     * @param encode\n     */\n    exports.sliceToZero = function (arrayBuffer, start, encode) {\n        var bufferView;\n        if (encode === \'ascii\') {\n            bufferView = getView(arrayBuffer, 1);\n        }\n        else if (encode === \'utf16\') {\n            bufferView = getView(arrayBuffer, 2);\n        }\n        else {\n            throw new Error(\'unsupport encode: \' + encode);\n        }\n        for (var i = start; i < bufferView.length; i++) {\n            if (bufferView[i] === 0) {\n                return bufferView.slice(start, i).buffer;\n            }\n        }\n        return bufferView.slice(start).buffer;\n    };\n    /**\n     *\n     * @param buffer NODEJS Buffer\n     */\n    exports.bufferToArrayBuffer = function (buffer) {\n        var arrayBuffer = new ArrayBuffer(buffer.length);\n        var bufferView = new Uint8Array(arrayBuffer);\n        for (var i = 0; i < buffer.length; ++i) {\n            bufferView[i] = buffer[i];\n        }\n        return arrayBuffer;\n    };\n    exports.concat = function () {\n        var args = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            args[_i] = arguments[_i];\n        }\n        var length = 0;\n        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {\n            var arr = args_1[_a];\n            length += arr.byteLength;\n        }\n        var result = new ArrayBuffer(length);\n        var resultView = new Uint8Array(result);\n        var offset = 0;\n        for (var _b = 0, args_2 = args; _b < args_2.length; _b++) {\n            var item = args_2[_b];\n            if (item instanceof ArrayBuffer) {\n                var view = new Uint8Array(item);\n                for (var i = 0; i < view.length; i++) {\n                    resultView[i + offset] = view[i];\n                }\n                offset += view.length;\n            }\n        }\n        return result;\n    };\n});\n\n\n//# sourceURL=webpack://ABUtils/./index.ts?')}},w={},__webpack_require__.m=v,__webpack_require__.c=w,__webpack_require__.d=function(e,r,t){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(r,e){if(1&e&&(r=__webpack_require__(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)__webpack_require__.d(t,n,function(e){return r[e]}.bind(null,n));return t},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./index.ts");function __webpack_require__(e){if(w[e])return w[e].exports;var r=w[e]={i:e,l:!1,exports:{}};return v[e].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}var v,w})},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(2),i=t(3),f=t(0),a=(MP3Reader.prototype.updateAlbumPicture=function(e){var r=this.ID3V2.findLabel("APIC");r?r.content.pictureBuffer=e:this.ID3V2.insertPicture(e)},MP3Reader.prototype.export=function(){return f.concat(this.ID3V2.export(),this.body,this.ID3V1?this.ID3V1.export():new ArrayBuffer(0))},MP3Reader);function MP3Reader(e){this.ID3V2=new n.ID3V2Frame(e),this.body=e.slice(this.ID3V2.size+10);try{this.ID3V1=new i.ID3V1Frame(e),this.body=this.body.slice(0,this.body.byteLength-128)}catch(e){console.error(e)}}r.default=a},function(e,r,t){"use strict";var n,i=this&&this.__extends||(n=function(e,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)},function(e,r){function __(){this.constructor=e}n(e,r),e.prototype=null===r?Object.create(r):(__.prototype=r.prototype,new __)}),a=this&&this.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;for(var n=Array(e),i=0,r=0;r<t;r++)for(var f=arguments[r],a=0,o=f.length;a<o;a++,i++)n[i]=f[a];return n};Object.defineProperty(r,"__esModule",{value:!0}),r.ID3V2Frame=void 0;var o=t(0),u=(ID3V2Label.prototype.load=function(e,r){this.frameID=o.toString(e.slice(r,r+4)),this.size=o.readInt(e,r+4,4),this.flags=o.readInt(e,r+8,2),this.content=this.decodeContent(e.slice(r+10,r+10+this.size)),this.raw=e.slice(r,r+this.size+10)},ID3V2Label.prototype.decodeContent=function(e){},ID3V2Label.prototype.decodeTextContent=function(r){var t=o.readInt(r,0,1);r=r.slice(1);try{return{encode:t,text:o.toString(r,this.getEncodeType(t),!0)}}catch(e){return{encode:t,text:r.toString()}}},ID3V2Label.prototype.toHeaderArratBuffer=function(){return o.concat(o.toArrayBuffer(this.frameID,"ascii"),o.writeInt(new ArrayBuffer(4),0,4,this.size),o.writeInt(new ArrayBuffer(2),0,2,this.flags))},ID3V2Label.prototype.toArratBuffer=function(){return this.raw},ID3V2Label.prototype.getEncodeType=function(e){switch(e){case 0:return"ascii";case 1:return"utf16le";case 2:return"utf16be";default:throw new Error("unsupport encode: "+e)}},ID3V2Label);function ID3V2Label(){}var f,s=(i(APIC,f=u),APIC.prototype.decodeContent=function(e){var r=o.readInt(e,0,1);e=e.slice(1);var t=o.sliceToZero(e,0,"ascii"),n=o.toString(t,"ascii");e=e.slice(t.byteLength+1);var i=o.readInt(e,0,1,1);e=e.slice(1);var f=o.toString(o.sliceToZero(e,0,0===r?"ascii":"utf16"),this.getEncodeType(r));return{descriptionEncode:r,mime:n,pictureType:i,description:f,pictureBuffer:e=e.slice(f.length*(r+1)+(r+1))}},APIC.prototype.toArratBuffer=function(){var e=this.toBodyArratBuffer();this.size=e.byteLength;var r=this.toHeaderArratBuffer();return o.concat(r,e)},APIC.prototype.toBodyArratBuffer=function(){return o.concat(o.writeInt(new ArrayBuffer(1),0,1,this.content.descriptionEncode),o.toArrayBuffer(this.content.mime,"ascii",!1,!0),o.writeInt(new ArrayBuffer(1),0,1,this.content.pictureType),this.content.description?o.toArrayBuffer(this.content.description,this.getEncodeType(this.content.descriptionEncode),!1,!0):new ArrayBuffer(1),this.content.pictureBuffer)},APIC.create=function(e,r){void 0===r&&(r="");var t=new APIC,n="";switch(o.readInt(e,0,2)){case 35152:n="image/png";break;case 65496:n="image/jpeg";break;default:n="image/jpeg"}return t.frameID="APIC",t.flags=0,t.content={descriptionEncode:0,mime:n,pictureType:3,description:r,pictureBuffer:e},t.size=t.toBodyArratBuffer().byteLength,t},APIC);function APIC(){return null!==f&&f.apply(this,arguments)||this}var c,_=(i(COMM,c=u),COMM.prototype.decodeContent=function(e){var r=o.readInt(e,0,1);e=e.slice(1);var t=0===r?"ascii":"utf16",n=0===r?1:2,i=o.toString(e.slice(0,3),"ascii");e=e.slice(3);var f=o.sliceToZero(e,0,t);return e=e.slice(f.byteLength+n),{encode:r,language:i,shortContent:o.toString(f,this.getEncodeType(r),!0),text:o.toString(e,this.getEncodeType(r),!0)}},COMM.prototype.toArratBuffer=function(){var e=o.concat(o.writeInt(new ArrayBuffer(1),0,1,this.content.encode),o.toArrayBuffer(this.content.language,"ascii",!1,!1),o.toArrayBuffer(this.content.shortContent,this.getEncodeType(this.content.encode),!0,!0),o.toArrayBuffer(this.content.text,this.getEncodeType(this.content.encode),!0,!0));return this.size=e.byteLength,o.concat(this.toHeaderArratBuffer(),e)},COMM);function COMM(){return null!==c&&c.apply(this,arguments)||this}var p,l=(i(TXXX,p=u),TXXX.prototype.decodeContent=function(e){var r=o.readInt(e,0,1);e=e.slice(1);var t=0===r?"ascii":"utf16",n=0===r?1:2,i=o.sliceToZero(e,0,t),f=o.sliceToZero(e.slice(i.byteLength+n),0,t);return{encode:r,key:o.toString(i,this.getEncodeType(r)),value:o.toString(f,this.getEncodeType(r))}},TXXX.prototype.toArratBuffer=function(){var e=o.concat(o.writeInt(new ArrayBuffer(1),0,1,this.content.encode),o.toArrayBuffer(this.content.key,this.getEncodeType(this.content.encode),!0,!0),o.toArrayBuffer(this.content.value,this.getEncodeType(this.content.encode),!0,!0));return this.size=e.byteLength,o.concat(this.toHeaderArratBuffer(),e)},TXXX);function TXXX(){return null!==p&&p.apply(this,arguments)||this}var d,w=(i(TextInformation,d=u),TextInformation.prototype.decodeContent=function(e){return this.decodeTextContent(e)},TextInformation.prototype.toArratBuffer=function(){var e=o.concat(o.writeInt(new ArrayBuffer(1),0,1,this.content.encode),o.toArrayBuffer(this.content.text,this.getEncodeType(this.content.encode),!0,!0));return this.size=e.byteLength,o.concat(this.toHeaderArratBuffer(),e)},TextInformation);function TextInformation(){return null!==d&&d.apply(this,arguments)||this}var b=(ID3V2Frame.prototype.insertPicture=function(e,r){void 0===r&&(r="");var t=s.create(e,r);this.labels.push(t)},ID3V2Frame.prototype.export=function(){var e=o.concat.apply(void 0,a([o.toArrayBuffer("ID3","ascii"),o.writeInt(new ArrayBuffer(1),0,1,this.version),o.writeInt(new ArrayBuffer(1),0,1,this.revision),o.writeInt(new ArrayBuffer(1),0,1,this.flag),new ArrayBuffer(4)],this.labels.map(function(e){return e.toArratBuffer()}))),r=this.mp3.slice(this.size+10);this.size=e.byteLength-10;var t=Math.floor(this.size/2097152);o.writeInt(e,6,1,t);var n=Math.floor((this.size-2097152*t)/16384);o.writeInt(e,7,1,n);var i=Math.floor((this.size-2097152*t-16384*n)/128);o.writeInt(e,8,1,i);var f=Math.floor(this.size-2097152*t-16384*n-128*i);return o.writeInt(e,9,1,f),o.concat(e,r)},ID3V2Frame.prototype.findLabel=function(e){for(var r=0,t=this.labels;r<t.length;r++){var n=t[r];if(n.frameID===e)return n}},ID3V2Frame);function ID3V2Frame(e){if(this.labels=[],"ID3"!==o.toString(e.slice(0,3)))throw new Error("ID3V2 frame not found");if(this.version=o.readInt(e,3,1),this.revision=o.readInt(e,4,1),3!==this.version)throw new Error("unspport ID3V2 version: "+this.version);this.mp3=e,this.flag=o.readInt(e,5,1);for(var r=new Uint8Array(e.slice(6,10)),t=0;t<r.byteLength;t++)r[t]=127&r[t];this.size=2097152*r[0]+16384*r[1]+128*r[2]+r[3];for(var n=10;n<10+this.size&&0!==o.readInt(e,n,4);){var i=o.toString(e.slice(n,n+4)),f=void 0;(f=new("TXXX"===i?l:"APIC"===i?s:"COMM"===i?_:"T"===i[0]?w:u)).load(e,n),this.labels.push(f),n+=f.size+10}this.endOffset=n}r.ID3V2Frame=b},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ID3V1Frame=void 0;var n=t(0),i=(ID3V1Frame.prototype.export=function(){return n.concat(n.toArrayBuffer("TAG","ascii",!1,!1,3),n.toArrayBuffer(this.title,"ascii",!1,!1,30),n.toArrayBuffer(this.artist,"ascii",!1,!1,30),n.toArrayBuffer(this.album,"ascii",!1,!1,30),n.toArrayBuffer(this.year,"ascii",!1,!1,4),n.toArrayBuffer(this.comment,"ascii",!1,!1,0===this.reserved?28:30),0===this.reserved?n.writeInt(new ArrayBuffer(1),0,1,0):new ArrayBuffer(0),0===this.reserved?n.writeInt(new ArrayBuffer(1),0,1,this.track):new ArrayBuffer(0),n.writeInt(new ArrayBuffer(1),0,1,this.genre))},ID3V1Frame);function ID3V1Frame(e){var r=e.slice(e.byteLength-128);if("TAG"!==n.toString(r.slice(0,3)))throw new Error("ID3V1 frame not found");this.title=n.toString(r.slice(3,33),"ascii",!0),this.artist=n.toString(r.slice(33,63),"ascii",!0),this.album=n.toString(r.slice(63,93),"ascii",!0),this.year=n.toString(r.slice(93,97),"ascii",!0),this.comment=n.toString(r.slice(97,125),"ascii",!0),this.reserved=n.readInt(r,125,1),0===this.reserved?this.track=n.readInt(r,126,1):(this.track=0,this.comment=n.toString(r.slice(97,127),"ascii",!0)),this.genre=n.readInt(r,127,1)}r.ID3V1Frame=i}],d={},__webpack_require__.m=c,__webpack_require__.c=d,__webpack_require__.d=function(e,r,t){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(r,e){if(1&e&&(r=__webpack_require__(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)__webpack_require__.d(t,n,function(e){return r[e]}.bind(null,n));return t},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=1).default;function __webpack_require__(e){if(d[e])return d[e].exports;var r=d[e]={i:e,l:!1,exports:{}};return c[e].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}var c,d});
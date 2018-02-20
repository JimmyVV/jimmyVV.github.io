/**
 * Using LoaderAllMedia to download audio samples.
 * After Loaderd, it will return ths structure like this:
 *  this._realData = loaderAllMedia.music;
 * {
 *  name:'A4', // it contain: A4,A6....
 *  buffer:arrayBuffer, // it will get real data of audio
 * }
 */

import './polyfill';
import 'whatwg-fetch';

import Context from './context';




export default class LoaderAllMedia extends Context{
    constructor(param){
        super(param);

        let {musicData} = param;

        this._allKeys = musicData.data;
        this._dir = musicData.dir;


    }

    download(){

        Promise.all(Object.keys(this._allKeys).map(key=>{
            return fetch('src/assets/'+ this._dir +'/' + this._allKeys[key].name )
            .then(res=>{
                 return res.arrayBuffer()
            })
            .then(audio=>{
                this._context.decodeAudioData(audio,buffer =>{
                     this._allKeys[key].buffer =  buffer;
                })
            })
        }))
    }
    get music(){
        return this._allKeys;
    }
}
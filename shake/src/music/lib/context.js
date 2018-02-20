let AudioContext = window.AudioContext || window.webkitAudioContext;
let context  = new AudioContext();
export default class Context{
    constructor(){
        this._context = context;

    }
}
import SoundContext from '../lib/context';
import mitt from 'Mitt';

export default class SourceNode extends SoundContext {
    constructor() {
        super();

        // this._female = "http://villainhr-1252111119.file.myqcloud.com/femail_copy.wav";

        this._female = '/src/assets/gasp/female.wav';

        this._step = 1;

        this._emitter = mitt();

        this._onceStart = false;


        fetch(this._female)
            .then(res => {
                return res.arrayBuffer()
            })
            .then(audio => {
                this._context.decodeAudioData(audio, buffer => {

                    this._audioBuffer = buffer;
                    this._createGaspNode();

                });
            });

        
    }
    
    _createGaspNode(){
        this._gaspBufferNode = this._context.createBufferSource();

        this._playSetting();

        this._gaspBufferNode.buffer = this._audioBuffer;

        this._gaspBufferNode.connect(this._context.destination);
    }
    on(name, fn) {
        switch (name) {
            case "canplay":
                this._emitter.on('canplay', fn);
                break;
        }
    }

    _playSetting() {
        this._length = Math.floor(this._audioBuffer.length);
    }
    stop() {
        this._gaspBufferNode.stop();
    }

    play() {
        this._gaspBufferNode.start(this._context.currentTime);
        
    }
    get maxLength() {
        return this._length;
    }

}
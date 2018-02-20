import SoundContext from '../lib/context';
import {HzRanges} from '../../music/lib/musicData';

export default class OscillatorSound extends SoundContext{
    constructor(param){
        super();

        this._type = param.oscill_type || "sine";

        this._segmentTime = param.single_time || 1;

        this._initPlayer();
    }
    _initPlayer(){

        this._oscillator = this._context.createOscillator();
        this._oscillator.type = this._type;

        this._gainNode = this._context.createGain();
        this._gainNode.gain.setValueAtTime(.8,this._context.currentTime);

        this._oscillator.connect(this._gainNode);

        this._gainNode.connect(this._context.destination);

        this._oscillator.start(this._context.currentTime);

        this.play(0);

    }
    play(cursor){
        let freq = HzRanges[cursor];
        this._oscillator.frequency.setValueAtTime(freq,this._context.currentTime);
    }
    stop(){
        let time  =  this._context.currentTime;

        this._gainNode.gain.exponentialRampToValueAtTime(0.001, time);

        this._oscillator.stop();
    }
    get maxLength(){
        return HzRanges.length;
    }
}
import SoundContext from './lib/context';
import OscillatorPlayer from './soundClass/oscillator';
import GaspPlayer from './soundClass/sexyPlayer';


export default class Player extends SoundContext{
    constructor(){
        super();
        
        this._oscillator_config = {
            oscill_type:'sine',
            single_time:2
        }

        this._decreaseSpeed = {
            range:1,
            timeRanges:120
        }
        this._cursor = 0;
        this._maxCount = 0;

        // the ranges of human hearing is 20-20k
        

        this._oscillPlayer = new OscillatorPlayer(this._oscillator_config);

        this._gaspPlayer = new GaspPlayer();

        this._gaspPlayer.on('canplay',()=>{
            this._sexyCanplay = true;
        })

        this._player = this._oscillPlayer;

        this._maxCursor = this._player.maxLength;

        this._setTheSpeed();
    }
    switch(choice){

        this._player.stop();

        switch(choice){
            case "pinao":
                this._player = this._oscillPlayer;
                this._decreaseSpeed.timeRanges = 120;
            break;
            case 'sexy':
                this._player = this._gaspPlayer;
                this._decreaseSpeed.timeRanges = 1100;
            break;
        }

        this._maxCursor = this._player.maxLength;
    }

    play(handShakeCounts){
        let freSpeed = this._sectionFn(handShakeCounts);
        this._cursor = Math.min(this._cursor + freSpeed,this._maxCursor);
    }
    timeClock(){
        
     
    }

    _sectionFn(freq){
        if(freq>0 & freq<=5){
            return 1;
        } else if(freq > 5 && freq <= 10){
            return 2;
        }else{
            return 3
        }

    }
    _setTheSpeed(){

        this._cursor = Math.max(0,this._cursor- this._decreaseSpeed.range);


        this._player.play(this._cursor);
        // decrease the speed to increase 
        this._timeoutController = setTimeout(() => {
            
            this._setTheSpeed();
            
        },this._decreaseSpeed.timeRanges);
    }




}
import Shake from 'shake.js';
import emitter from '../lib/mitt';

const log = console.log.bind(console);

export default class ShakeController{
    constructor(){
        /**
         * register shake event
         */

        this._coefficient = {
            threshold:5,
            shakeMaxTime: 20,
            soundTimeRange: 250, // the ranges is [0,12]
            soundCoeff:2,
        }

         this._shake = new Shake({
            threshold: this._coefficient.threshold, // optional shake strength threshold, 9m/s^2
            timeout: this._coefficient.shakeMaxTime, // set the interval to trigger event. so accumulated max times are the Math.floor(countTime/timeout)
         });

         this._shake.start();


         this._count = 0;
         this._tmpDate;

         this._emitter = emitter();

         

         window.addEventListener('shake',this.shakeHander.bind(this),false);
    }

    shakeHander(){

        if(!this._tmpDate){
            this._tmpDate = new Date();
            this._count = 1;

            return;
        }


        let current = new Date();

        if(current.getTime() - this._tmpDate.getTime() < this._coefficient.soundTimeRange){
            this._count++;
            this._getTheFreq();
        }else{
            // 1000s 

            this._tmpDate = null;
        }

    }

    /** 
     * accrouding to the shaking frequency, calculate the sound freq.
     * the formular is n*c/2
    */
    _getTheFreq(){        
        this._emitter.emit('handShake',this._count);

    }
    on(name,fn){
        switch(name){
            case 'handShake':
                this._emitter.on('handShake',fn);
            break;
        }
    }



}
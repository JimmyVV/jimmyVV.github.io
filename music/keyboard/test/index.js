import '../src/lib/polyfill';
import React from  'react';
import ReactDOM from 'react-dom';
import KeyBoard from '../src/component/keyboard';
import Loader from '../src/lib/loader';
import Player  from '../src/play';
import keyboard from 'keyboardjs';
import {guitar,drum,bass} from '../src/lib/musicData';


const log = console.log.bind(console);


class Controller{
    constructor(){


        this._targetData = guitar;
        this._player = new Player();

        // now we could get the all the media resources.
        this._main();

        this._bindChoiceHandler();

        
    }
    _getInitKeys(){
        this._initKeys = {};
        
        Object.keys(this._targetData.data).forEach(key=>{
            this._initKeys[key] = {
                type:'letter',
                press: false
            }
        });

    }
    onChange(choice){
        switch(choice){
            case "guitar":
                this._targetData = guitar;
            break;
            case "drum":
                this._targetData = drum;
            break;
            case "bass":
                this._targetData = bass;
        }



        this._main();
    }
    _main(){
        this._music = this._targetData.data;
        this._loader = new Loader({musicData: this._targetData});
        this._loader.download();
        this._bindKeys();

        this._getInitKeys();

        this._renderKey();

    }
    _renderKey(){

        ReactDOM.render(<KeyBoard keyBoard={this._initKeys}  />,document.getElementById('react-container'));
    }

    _bindChoiceHandler(){
        this._input = document.getElementById('music-choice');

        this._input.addEventListener('change',
        (e)=>{

            this.onChange(e.target.value);

        },false);
    }
    _bindKeys(){
        keyboard.reset();

        Object.keys(this._music).forEach(key=>{

            let player = this._player.createPlay();

            keyboard.on(key,(e)=>{
                e.preventRepeat();
                // press down
                player.play(this._music[key].buffer,key);

                this._initKeys[key].press = true;

                this._renderKey();
            },()=>{
                // press up
                // player.stop();
                this._initKeys[key].press = false;

                this._renderKey();
            });
        })
    }
}



new Controller()
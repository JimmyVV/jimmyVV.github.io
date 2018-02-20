import ShakeController from '../src/shake';
import Player from '../src/music/player';

import 'whatwg-fetch';

const log = console.log.bind(console);

class Main{
    constructor(){
        this._shake = new ShakeController();

        this._shake.on('handShake',this._enhanceSound.bind(this));

        this._player = new Player();

    }
    _enhanceSound(freq){
        this._player.play(freq);
    }
}

new Main();



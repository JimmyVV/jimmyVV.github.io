import AOP from '../lib/AOP';

const log = console.log.bind(console);


export default class PlayerAOP{
    constructor(target){
        this._aop = new AOP(target);

        this._bind();
    }
    _bind(){
        this._aop.before("play",(buffer,key)=>{
            log('play the ' + key);
        });
    }
}
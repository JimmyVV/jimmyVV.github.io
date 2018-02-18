import meld from 'meld'

export default class AOP{
    constructor(target){
        this._target = target;
    }
    before(name,fn){
        meld.before(this._target,name,fn);
    }
    after(name,fn){
        meld.before(this._target.name,fn);
    }
}
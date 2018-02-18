export default class PlayNode{
    constructor(context,anaylse){
        this._context = context;
        this._analyse = anaylse;

    }
    play(buffer,key){

        // disconnect listener
        this._analyse.disconnect();

        this._gainNode = this._context.createGain();

        this._playSource = this._context.createBufferSource();
        this._playSource.buffer  = buffer;


        this._playSource.connect(this._analyse);

        this._analyse.connect(this._gainNode);
        
        this._gainNode.connect(this._context.destination);
        this._gainNode.gain.setValueAtTime(.8,this._context.currentTime);

        this._playSource.start(this._context.currentTime);
        

        
    }
    stop(){
        var ct = this._context.currentTime + .5;
        this._gainNode.gain.exponentialRampToValueAtTime(0.001,ct);
        this._playSource.stop(ct);
    }

}
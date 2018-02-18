
const log = console.log.bind(console);

export default class Graph{
    constructor(analyse){

        this._canvas = document.getElementById('audio-graph');

        this._graph = this._canvas.getContext('2d');
        this._analyseNode = analyse;

        this._config = {
            width:this._canvas.clientWidth,
            height:this._canvas.clientHeight,
            freq:{
                ffsize: 512
            },
            wave:{

            }
        }

    }
    _clear(){
        this._graph.clearRect(0,0,this._config.width,this._config.height);
    }

    drawFreq(){
        this._bufferLen = this._analyseNode.frequencyBinCount; // half size of FFT

        this._freqBuffer = new Uint8Array(this._bufferLen);



        this._clear();

        this._drawFreqRef();

    }

    _drawFreqRef(){
        this._refControl = requestAnimationFrame(this._drawFreqRef.bind(this));

        

        this._analyseNode.getByteFrequencyData(this._freqBuffer);


        this._graph.fillStyle = '#000';
        
        this._graph.fillRect(0,0,this._config.width,this._config.height);

        let barWid = (this._config.width/this._bufferLen) * 2.5;
        let x = 0;


        this._freqBuffer.forEach(freq=>{
            this._graph.fillStyle = `rgba(200,200,${freq/10},1)`;

            // the canvas's y_axis is inverted, so the y_axis is invert
            this._graph.fillRect(x,this._config.height - freq/3,barWid,freq/2);

            x += barWid + 1;

        });
    }
}
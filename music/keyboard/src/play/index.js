import Context from '../lib/context';
import PlayAOP from '../decorator/play';
import PlayNode from './nodes/playNode';
import Graph from '../graph/index';

export default class Player extends Context{
    constructor(){
        super();
        this._analyse = this._getAnalyse();

        this._graph = new Graph(this._analyse);

        this._graph.drawFreq();
    }

    createPlay(){
        return new PlayNode(this._context,this._analyse);
    }
    _getAnalyse(){
        this._analyse = this._context.createAnalyser();
        this._analyse.maxDecibels = -20;
        this._analyse.minDecibels = -90;
        this._analyse.smoothingTimeConstant = 0.80;


        return this._analyse;

    }
    get analyseNode(){
        return this._analyse;
    }

}
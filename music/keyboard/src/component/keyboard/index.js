import React,{Component} from 'react';

import './index.scss';
/**
 * the props format is like:
 *  keyBoard [Object]:
 *      keyName[Object]{
 *              type[String] : letter ; // only the value
 *              press[Boolea]: true
 *              }
 *              
 */

export default class Keyboard extends Component{
    render(){
        let {keyBoard} = this.props;

        let keys = Object.keys(keyBoard).map(key=>{
            return (
                <div className={`${keyBoard[key].type} ${keyBoard[key].press ? "pressed":''}`}>
                    {key.toUpperCase()}
                </div>
            )
        });

        return (
            <div className="keyboard">
                {keys}
            </div>
        )
    }
}
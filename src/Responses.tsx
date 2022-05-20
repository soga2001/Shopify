import React from 'react';
import {Response} from './Interfaces';
import {Choice} from './Choices'

interface DataProps{
    item: Response
}

export const Responses: React.FC<DataProps> = (item: DataProps) => {

    return(
        <div id="map">
            <div id='prompt'>
                <span id='title'>Prompt: </span>
                <span>{item.item.prompt}</span>
            </div>
            {item.item.choices.map((choice, index) => (
                <div key={index}>
                    <Choice key={index} item={choice} />
                </div>
                
            ))}
        </div>
    )
}
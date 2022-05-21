import React from 'react';
import {Choices} from './Interfaces';

interface ChoicesProps{
    item: Choices
}

export const Choice: React.FC<ChoicesProps> = (item: ChoicesProps) => {

    return(
        <div id='response'>
            <span id='title'>Response: </span>
            <span>{item.item.text}</span>
        </div>
    )
}
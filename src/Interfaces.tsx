import React from 'react';

export interface Choices{
    finish_reason: string
    index: number
    text: string
}


export interface Response{
    choices: Choices[]
    id: string
    model: string
    object: string
    prompt: string
}
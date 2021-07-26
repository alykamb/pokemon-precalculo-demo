import React, { EventHandler, MouseEvent, useCallback, useContext, useEffect, useState } from 'react';
import { FunctionContext } from './Function';
import { MouseContext } from './mouseContext';



export const Pokemon = ({id, src}: any, index: number, offset: number, size: number, delta: number) => {
    const fu = useContext(FunctionContext)
    const {x, y} = useContext(MouseContext)    
    let properties = {
        '--index': index+offset,
    }
    try {
        const result: any = fu ? fu(index+offset, size, x, y, delta) : {}
        Object.keys(result).forEach((key) => {
            (properties as any)[`--${key}`] = result[key] 
        })
    } catch (e) {

    }
   

    return (
        <div className="pokemon" key={id} style={properties as any}>
            <img src={src} alt="" />
        </div>
    )
}

export const Pokemons = ({pokemons}: any) => {
    const [offset, setOffset] = useState(0)
    const [delta, setDelta] = useState(0)

    useEffect(() => {
        let time = Date.now()
        function onFrame() {
            setDelta(Date.now() - time)
            requestAnimationFrame(onFrame)
        } 

        onFrame()
    }, [])

    return <div className="pokemons" >
        {pokemons.map((p: any, i: number) => Pokemon(p, i, offset, pokemons.length, delta))}
    </div>
}
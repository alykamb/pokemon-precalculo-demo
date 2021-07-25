import React, { useCallback, useState, createContext, FunctionComponent, ReactElement, useContext, useEffect } from 'react';
import { MouseContext } from './mouseContext';
import { WorldContext } from './worldContext';

const functionsList = {
    'Circulo': `
    (index, qtd, x, y, d) => {
        const atraso = 0.0001 * d
        const ratio = height/width
        const angulo = ((index-1) * 2*Math.PI/(qtd))

        return {
           x: ratio * Math.cos(angulo + atraso)/3 + 0.5, 
           y: Math.sin(angulo + atraso)/3 + 0.5, 
           s: 1.5,
           ry: 1,
           index: index
        }
    }
    `,
    'Circulo com selecionado no centro': `(index, qtd, x, y, d) => {
        const atraso = 0.0001 * d
        const ratio = height/width
        const u = x/width
        const v = y/height

        const selecionado = Math.floor(u * qtd)
        if(index == selecionado) {
           return {x: 0.5, y: 0.5, s:3}
        }

        const angulo = ((index-1) * 2*Math.PI/(qtd))

        return {
           x: ratio * Math.cos(angulo + atraso)/3 + 0.5, 
           y: Math.sin(angulo + atraso)/3 + 0.5, 
           s: 1.5 * (1-Math.abs(index - selecionado) / qtd) ,
           ry: 1,
           index: index
        }
    }`,
    'Selecionado Log': `(index, qtd, x, y, d) => {
        const atraso = 0.0001 * d
        const ratio = height/width
        const u = x/width
        const v = y/height

        const selecionado = Math.floor(u * qtd)
        if(index == selecionado) {
           return {
              x: 0.5, 
              y: 0.5, 
              s: 2.5, 
              index: 1,
              t: 0.5
           }
        }

        const angulo = ((index-1) * 2*Math.PI/(qtd))

        const delta = selecionado - index
        const lado = delta/Math.abs(delta)

        return {
           x: 0.1* lado * ratio * Math.log(5* Math.abs(delta) + 1) + 0.5, 
           y: 0.5, 
           s: 1.5 * (1-Math.abs(index - selecionado) / qtd) ,
           ry: 1,
           index: qtd + Math.abs(delta),
           t: 0.2
        }
    }`,
    'Selecionado quadrático': `(index, qtd, x, y, d) => {
        const atraso = 0.0001 * d
        const ratio = height/width
        const u = x/width
        const v = y/height

        const selecionado = Math.floor(u * qtd)
        if(index == selecionado) {
           return {
              x: 0.5, 
              y: 0.5, 
              s: 2.5, 
              index: 1,
              t: 0.5
           }
        }

        const angulo = ((index-1) * 2*Math.PI/(qtd))

        const delta = selecionado - index
        const lado = delta/Math.abs(delta)

        return {
           x: 0.01* lado * ratio * Math.pow(delta, 2) + 0.5, 
           y: 0.5, 
           s: 1.5 * (1-Math.abs(index - selecionado) / qtd) ,
           ry: 1,
           index: qtd + Math.abs(delta),
           t: 0.2
        }
    }`,
    'Selecionado Linear': `(index, qtd, x, y, d) => {
        const atraso = 0.0001 * d
        const ratio = height/width
        const u = x/width
        const v = y/height

        const selecionado = Math.floor(u * qtd)
        if(index == selecionado) {
           return {
              x: 0.5, 
              y: 0.5, 
              s: 2.5, 
              index: 1,
              t: 0.5
           }
        }

        const angulo = ((index-1) * 2*Math.PI/(qtd))

        const delta = selecionado - index
        const lado = delta/Math.abs(delta)

        return {
           x: 0.1*  ratio * delta + 0.5, 
           y: 0.5, 
           s: 1.5 * (1-Math.abs(index - selecionado) / qtd) ,
           ry: 1,
           index: qtd + Math.abs(delta),
           t: 0.2
        }
    }`
}

export type FType = null | ((arg: number) => {x: number, y: number, s:number})

export const FunctionContext = createContext<FType>(null)

export const Function: FunctionComponent = ({children}) => {
    const [fu, setF] = useState<FType>(() => (index: number) => {
        return {
           x: 0.01 * index + 0.5, 
           y:0.01 * index * index + 0.5, 
           s:1.0 - 0.01 * index * index,
           index: index
        }
    })

    const [value, setValue] = useState('')

    const {width, height, depth} = useContext(WorldContext)

    const onInput = useCallback((value) => {        
        try {
            let  f: FType = null
            setValue(value)
            eval('f = ' + value)
            setF(() => f)
        } catch (e) {
        }
    }, [setValue, setF, width, height, depth])

    useEffect(() => {
        onInput(functionsList.Circulo)
    }, [])

    return (
        <>  
            <div className="input">
            <textarea  rows={14} cols={50} onInput={(e) => onInput(e.currentTarget.value)} value={value}/>
            <div>

                <select name="" id="" onChange={(e: any) => onInput(functionsList[e.currentTarget.value])}>
                    {Object.keys(functionsList).map(key => <option value={key} key={key}>{key}</option>)}
                </select>
            </div>
            </div>
            <FunctionContext.Provider value={fu}>
                {children}
            </FunctionContext.Provider>
        </>
    )
}


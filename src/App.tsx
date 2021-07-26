import React, { useEffect, useRef, useState } from 'react'
import './App.scss'
import * as Pokeapi from 'pokeapi-js-wrapper'
import { Pokemons } from './Pokemon'
import { Function } from './Function'
import pokemon from './pokemon.json'
import { WorldContext } from './worldContext'
import { MouseContext } from './mouseContext'

const firstNine = Array.from({length: 25}).map((_, i) => `/api/v2/pokemon/${i+1}`)
const P = new Pokeapi.Pokedex()

function App() {
  const [mouse, setMouse] = useState({x:0, y:0})
  const [pokemons, setPokemons] = useState(pokemon)
  const [world, setWorld] = useState({
    width: 800,
    height: 800,
    depth: 800
  })
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {


    function onResize()  {
        const rect = wrapper.current?.getBoundingClientRect()
        if(rect) {
            setWorld((c) => ({
                ...c,
                width: rect.width,
                height: rect.height
            }))
        }
    }
    


    onResize()

    addEventListener('resize', onResize)

    function onPointerMove(e: PointerEvent) {
        setMouse({x: e.x, y: e.y})
    }

    addEventListener('pointermove', onPointerMove)

    return () => {
        removeEventListener('resize', onResize)
        removeEventListener<any>('onPointerMove', onPointerMove)
    }
  }, [])




  return (
    <div className="App" style={{'--width': world.width, '--depth': world.depth, '--height': world.height} as any}>
        <WorldContext.Provider value={world}>
        <MouseContext.Provider value={mouse}>

            <Function>
                <div className="wrapper" ref={wrapper}>
                    <Pokemons pokemons={pokemons}/>
                </div>
            </Function>
        </MouseContext.Provider>
        </WorldContext.Provider>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import './Pokemones.css'
import Detalle from './Detalle'

function Pokemon({id, nombre, imagen, verPokemon}){
    return(
        <div className='card' onClick={verPokemon} >
            <img src={imagen} alt={nombre} className='pokeimg' />
            <p className='poketittle'>
                <span>N°{id}</span>           
                <span>{nombre}</span>
            </p>
        </div>
    )
}

function Pokemones() {

    const [pokemones, setPokemones]=useState([])
    const [mostrar, setMostrar]=useState({mostrar:false, pokemon:{}})

    const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon })
    const noVerPokemon = () => setMostrar({ mostrar: false, pokemon: {}})
      

  useEffect(()=>{
    const Obtpokemon = async ()=>{
      const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      const Lista = await respuesta.json()
      const {results}=Lista
      // console.log(Lista)
      const pokemon = results.map(async(pokemon) => {
        // const poke = {}
        const respuesta = await fetch(pokemon.url)
        const pokemonInfo =await respuesta.json();

        const abilities = pokemonInfo.abilities.map(a => a.ability.name)
        const stats = pokemonInfo.stats.map(s => { return { name: s.stat.name, base: s.base_stat }})
        const types = pokemonInfo.types.map(t => t.type.name )

        return{
          id: pokemonInfo.id,
          nombre: pokemonInfo.name ,
          imagen: pokemonInfo.sprites.other.dream_world.front_default,
          abilities,
          stats,
          types
        }
      })

      setPokemones(await Promise.all(pokemon))
    }
    Obtpokemon()
  },[])

    return(
        <>
        <h1>Pokedex</h1>
        <Detalle {...mostrar} cerrar={noVerPokemon}/>
        <section className='container'>
            {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)}/>)}
        </section>
        </>
    )
}

export default Pokemones
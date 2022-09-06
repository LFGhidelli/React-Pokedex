import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex'
import React, {useEffect, useState } from 'react';
import { getPokemon, getPokemonData, searchPokemon } from './api';


const itensPerPage = 25

function App() {
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading,setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [pokemon, setPokemon] = useState([])

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      const data = await getPokemon(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises);
      // const result =  await getPokemon();
      setPokemon(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log(('fetchPokemon error:', error));
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [page]);


  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemon();
    }

    setLoading(true)
    setNotFound(false)

    const result = await searchPokemon(pokemon)

    if(!result) {
      setNotFound(true)
      setLoading(false)
    } else {
      setPokemon([result])
    }
    setLoading(false)
  }
  return (
    <div>
      <Navbar />
      <Searchbar onSearch={onSearchHandler}/>
      <Pokedex
        pokemon={pokemon}
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;

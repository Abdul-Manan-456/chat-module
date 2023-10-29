// import React from 'react'
// import {useSelector , useDispatch} from 'react-redux'
// import { increment , decrement } from './counterSlice'
// function Counter() {
//     const count = useSelector((state) => state.counter.value)
//     const dispatch = useDispatch()
//   return (
//  <div>
//     <button onClick={()=>dispatch(increment())}>Increment</button>
//     <p>{count}</p>
//     <button onClick={()=>dispatch(decrement())}>decrement</button>

//  </div>
//   )
// }

// export default Counter

import * as React from 'react'
import { useGetPokemonByNameQuery } from './counterSlice'

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}
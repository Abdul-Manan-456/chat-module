// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     value : 0
// }

// export const counterSlice = createSlice({
//     name : 'counter', 
//     initialState,
//     reducers :{
//         increment : (state)=>{
//             state.value +=1 
//         } ,
//         decrement : (state)=>{
//             state.value -=1 
//         },
//         incrementByAmount: (state, action) => {
//             state.value += action.payload
//           },
//     }
// })

// export const {increment , decrement , incrementByAmount } = counterSlice.actions
// export default counterSlice.reducer

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi


// import Counter from "./features/counter/Counter"
// function App (){

//   return (
//     <>
//     <h1>Redux toolkit state management </h1>
//     <Counter/>

//     </>
//   )
// }
// export default App 
import React, { useEffect, useState } from 'react'
import './main.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderCompleted from './pages/OrderCompleted'


const key = import.meta.env.VITE_OMDB_API_KEY

export const loader = async () => {
  return fetch(`https://www.omdbapi.com/?apikey=${key}&s='movies&page=1'`)
}  

function App() {
  const [selectedMovies, setSelectedMovies] = useState([])   
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedMovies))
    console.log(selectedMovies)
  }, [selectedMovies])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout setSelectedMovies={setSelectedMovies} selectedMovies={selectedMovies} />,
      children: [        
        {
          index: true,
          loader,
          element: <Home setSelectedMovies={setSelectedMovies} selectedMovies={selectedMovies} />
        },
        {
          path: '/carrinho',
          element: <Cart setSelectedMovies={setSelectedMovies} selectedMovies={selectedMovies} />
        },
        {
          path: '/pedido-finalizado',
          element: <OrderCompleted />
        },
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

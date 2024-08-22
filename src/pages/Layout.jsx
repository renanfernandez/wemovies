import {useEffect, useState} from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Layout = ({selectedMovies, setSelectedMovies}) => {

  return (
    <>     
      <Header selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies} />
      <Outlet />
    </>
  )
}

export default Layout
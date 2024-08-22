import { useState } from "react"
import { Link } from "react-router-dom"
import IconCasket from '../assets/icons/IconCasket'

const Header = ({selectedMovies, setSelectedMovies}) => {

  return (
    <header className="header">
      <Link to='/'>
        <h1 className="header--logo">
          WeMovies
        </h1>
      </Link>
      
      <Link to='/carrinho' className="cart-btn">
        <div className="cart-btn--content">
          <h2>Meu Carrinho</h2>
          <div className="cart-btn--count">
            <span className="cart-btn--count-number">{selectedMovies?.length} </span>
            <span className="cart-btn--count-text">{selectedMovies?.length === 1 ? ' item' : ' items'}</span>
          </div>
        </div>
        <IconCasket /> 
      </Link>
    </header>
  )
}

export default Header
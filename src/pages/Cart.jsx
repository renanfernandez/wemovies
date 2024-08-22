import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import IconTrash from '../assets/icons/IconTrash'
import IconMinus from '../assets/icons/IconMinus'
import IconPlus from '../assets/icons/IconPlus'

const Cart = ({selectedMovies, setSelectedMovies}) => {

  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || selectedMovies)

  const getSubtotal = (quantity, price) => {
    const fixedPrice = price.replace(',', '.')
    const total = fixedPrice * quantity
    const fixedTotal = total.toFixed(2).toString().replace('.', ',')

    return fixedTotal
  }

  const getTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total = total + (item.qnt * item.price.replace(',', '.'));
    })
    
    return total.toFixed(2).toString().replace('.', ',')
  }

  const removeCartItem = (id) => {
    console.log(id)
    setSelectedMovies(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, type) => {
    console.log(id,type)

    const updatedSelection = selectedMovies.map(selectedMovie => {
      if (selectedMovie.id === id) {
        if ( type === 'plus') {
          return {...selectedMovie, 'qnt': selectedMovie.qnt + 1}
        } else {
          return {...selectedMovie, 'qnt': selectedMovie.qnt - 1}
        }
      }
      return selectedMovie
    })
    setSelectedMovies(updatedSelection)
  }

  const handleSubmit = () => {
    localStorage.removeItem('cart')
    setSelectedMovies([])
    navigate('/pedido-finalizado')
  }

  useEffect(() => {
    setCartItems(selectedMovies)
  }, [selectedMovies])

  return (
    <section className='cart'>
      <div className="cart-items">
        {cartItems?.length > 0 ? (
          <>
            <div className="cart-row">
              <div>PRODUTO</div>
              <div>QTD</div>
              <div>SUBTOTAL</div>
              <div></div>
            </div>
            {cartItems.map(item => {
              return (
                <div key={item.id} className='cart-item'>
                  <figure className="cart-item--image-mobile">
                    <img src={item.poster} alt={item.name} />
                  </figure>
                  <div className='cart-item--product'>
                    <figure className='cart-item--image'>
                      <img src={item.poster} alt={item.name} />
                    </figure>
                    <div className='cart-item--desc'>
                      <p className='cart-item--name'>{item.name}</p>
                      <p className='cart-item--price'>R$ {item.price}</p>
                    </div>
                  </div>
                  <div className='cart-item--quantity'>
                    <button disabled={item.qnt === 1} onClick={() => updateQuantity(item.id, 'minus')}>
                      <IconMinus />
                    </button>
                    <p>{item.qnt}</p>
                    {/* 
                      TODO -> mudar para input para o usuário escolher quantidade 
                    */}
                    <button onClick={() => updateQuantity(item.id, 'plus')}>
                      <IconPlus />
                    </button>
                  </div>
                  <div className='cart-item--subtotal'>
                    R$ {getSubtotal(item.qnt, item.price)}
                  </div>
                  <div  className='cart-item--actions'>
                    <button onClick={() => removeCartItem(item.id)}>
                      <IconTrash />
                    </button>
                  </div>
                </div>
              )
            })}
            <div className="cart-items--bottom">
              <button className="btn btn--primary" onClick={handleSubmit}>FINALIZAR PEDIDO</button>
              <div className="cart-items--total">
                <span>TOTAL</span>
                <h2>R$ {getTotal()}</h2>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>Nenhum produto selecionado :(</h2>
          </>
        )}
      </div>      
    </section>
  )
}

export default Cart
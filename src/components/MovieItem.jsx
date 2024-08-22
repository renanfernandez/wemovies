import {useEffect, useState} from 'react'

const MovieItem = ({movie, setSelectedMovies, selectedMovies}) => {
  const [count, setCount] = useState(0)

  const createMoviePrice = (year) => {
    const releaseYear = year.slice(-4)
    switch (releaseYear) {
      case '2024' :
        return '39,99'
      case '2023':
        return '29,99'
      case '2022':
        return '19,99'
      default:
        return '9,99' 
    }
  }

  const movieIsSelected = (id) => {
    return selectedMovies.some((movie) => { return movie.id === id})
  }

  const handleAddMovie = (movie) => {
    if (movieIsSelected(movie.imdbID)) {
      const updatedSelection = selectedMovies.map(selectedMovie => {
        if (selectedMovie.id === movie.imdbID) {
          setCount(selectedMovie.qnt + 1)
          return {...selectedMovie, 'qnt': selectedMovie.qnt + 1}
        }
        return selectedMovie
      })
      setSelectedMovies(updatedSelection)
    } else {
      setCount(prev => prev + 1)
      setSelectedMovies(prev => prev.concat({'id': movie.imdbID , 'name': movie.Title, 'price': createMoviePrice(movie.Year), 'poster': movie.Poster, 'qnt': 1}))
    }
  }

  useEffect(() => {
    const currentMovie = selectedMovies.find(selectedMovie => selectedMovie.id === movie.imdbID)
    setCount(currentMovie?.qnt || 0)
  }, [selectedMovies])

  return (
    <div className="movie-list--item">
      <figure className='movie-list--item-img'>
        <img src={movie.Poster} alt={movie.Title} />
      </figure>
      <p className='movie-list--item-name'>{movie.Title}</p>
      <p className="movie-list--item-price">R$ {createMoviePrice(movie.Year)}</p>
      <button className={count > 0 ? "btn btn--secondary" : "btn btn--primary" } onClick={() => handleAddMovie(movie)}>
        {count}
        <span> ADICIONAR AO CARRINHO</span>
      </button>
    </div>
  )
}

export default MovieItem
import {useState, useEffect} from 'react'
import { useLoaderData } from "react-router-dom"
import MovieItem from '../components/MovieItem';
import ReloadGirl from '../assets/ReloadGirl';

const Home = ({setSelectedMovies, selectedMovies}) => {
  const movies = useLoaderData();

  const [movieList, setMovieList] = useState(movies.Search)  

  return (
    <main>
      {movieList.length > 0 ? (
        <section className="movie-list">
          {movieList?.map((movie) => <MovieItem key={movie.imdbID} movie={movie} setSelectedMovies={setSelectedMovies} selectedMovies={selectedMovies} />)}                    
        </section>
      ) : (
        <section className="message-screen">
          <div className="message-screen--content">
            <h2>Parece que não há nada por aqui :( </h2>
            <div className="reload-img-wrapper">
              <ReloadGirl />
            </div>
            <button className="btn btn--primary">Recarregar página</button>
          </div>
        </section>
      )}
    </main>
  )
}

export default Home


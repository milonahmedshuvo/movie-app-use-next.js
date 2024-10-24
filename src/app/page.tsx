/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}


const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('')


  useEffect(() => {
    setLoading(true)

    const fetchMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`)

      const data = await res.json()
      setMovies((provMovies) => [...provMovies, ...data.results])
      setLoading(false)
    }

    fetchMovies()
  }, [page])


  // Infinite Scroll Logic

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);


  }, [loading]);






  // movies search 
  const movieSearch = async (query: string) => {

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`)

    const data = await res.json()
    setMovies(data.results)

  }

  if (query) {
    movieSearch(query)
  }


  return (
    <div className='mt-5 mx-10'>

      <form className="w-full mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="border p-3 w-full rounded border-gray-400 outline-none"
        />
      </form>


      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie, i) => (
          <div key={i} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
      {loading && <p>Loading more movies...</p>}
    </div>
  );
};

export default Home;

'use client'

import { removeFromWatchlist, watchlist } from '@/actions/watchlistActions';
import { useState, useEffect, useTransition } from 'react';
import { MovieDetails } from '../page';
import Image from 'next/image';



async function getWatchlist() {
  return Array.from(watchlist.values());
}

export default function WatchlistPage() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const watchlistMovies = await getWatchlist();
      setMovies(watchlistMovies);
    };
    fetchWatchlist();
  }, []);

  const handleRemove = (movieId: number) => {
    startTransition(() => {
      removeFromWatchlist(movieId);
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    });
  };





  return (
    <div className='mx-10'>
      <h1 className='text-center text-2xl font-semibold my-5 '>My Watchlist</h1> 


      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className='flex items-center  gap-7 my-10'>
             

             <div className="w-1/3">
          <Image
            className="h-[200px] w-full"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={200}
          />
        </div>
           
           <div className="w-1/3">
            <p>title: {movie.title}</p>
            <p>title: {movie.overview}</p>
           </div>


           <div className="w-1/3 flex justify-center" >
           <button className='buttonRemove' onClick={() => handleRemove(movie.id as number)} disabled={isPending}>
              Remove from Watchlist
            </button>
           </div>
            




          </div>
        ))
      ) : (
        <p>No movies in your watchlist.</p>
      )}
    </div>
  );
}

/* eslint-disable prefer-const */

import { MovieDetails } from "@/app/page";




export let watchlist: Map<number, MovieDetails> = new Map();

export async function addToWatchlist(movie: MovieDetails) {
 
  watchlist.set(movie.id as number, movie);
}

export async function removeFromWatchlist(movieId: number | string) {
  
  watchlist.delete(movieId as number);
}
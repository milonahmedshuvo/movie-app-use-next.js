"use client";
import { addToWatchlist, removeFromWatchlist } from "@/actions/watchlistActions";
import { MovieDetails } from "@/app/page";

import { useState, useTransition } from "react";




const WatchlistButton = ({ movie}:{movie: MovieDetails}) => {

 
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isPending, startTransition] = useTransition();


  

  const toggleWatchlist = () => {

    startTransition(() => {
      if (isInWatchlist) {
        removeFromWatchlist(movie.id as string);
      } else {
        addToWatchlist(movie);
      }
      setIsInWatchlist((prev) => !prev);
    });
  };



  return (
    <button onClick={toggleWatchlist} disabled={isPending} className="buttons">
      {isPending ? "Processing..." : isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;

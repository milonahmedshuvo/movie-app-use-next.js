import Image from "next/image";

interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  job: string,
}

interface RecommendationMovie {
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


const MovieDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, {
    next: {
      revalidate: 60
    }
  })
  const movie = await res.json()


  const castRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, {
    next: {
      revalidate: 60
    }
  })
  const creditCast = await castRes.json()


  const recommendationResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
  const recommendationData = await recommendationResponse.json()

  


  return (
    <div className="mx-10">
      <div className=" w-1/3 mx-auto py-8">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <Image
          className="h-[350px]"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={200}
        />
        <p className="mt-4">{movie.overview}</p>

        <div className="mt-3">
          {
            movie?.genres?.map((genres: { id: string, name: string }, i: number) => <div key={i}>
              <span>genres: {genres.name}</span>
            </div>)
          }
        </div>


        <p className="mt-2">Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}/10</p>
      </div>


      <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 w-full mx-auto">
        {
          creditCast?.cast?.map((item: CastMember, i: number) => <div key={i} className="flex flex-col items-center justify-between mb-10 mt-4 ">

            <div>
              {
                item.profile_path ? <>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt={movie.title}
                    width={180}
                    height={200}
                  />
                </> : <p>not found image</p>
              }
            </div>
            <p>name:{item.name}</p>
          </div>)
        }
      </div>






      <div>
        <p className="text-3xl font-bold text-center mb-5 ">Recommendation Movie </p>

        <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 w-full mx-auto">
          {
            recommendationData?.results?.map((item: RecommendationMovie, i: number) => <div key={i} className="flex mx-6 flex-col items-center  mb-10 mt-4">
              <div>
                {
                  item.poster_path ? <>
                    <Image
                      className="h-[300px]"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={movie.title}
                      width={500}
                      height={200}
                    />
                  </> : <p>not found image</p>
                }
              </div>
              <p>overview:{item.overview}</p>
            </div>)
          }
        </div>
      </div>

    </div>
  );
};

export default MovieDetailsPage;

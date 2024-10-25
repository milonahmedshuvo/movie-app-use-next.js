/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';


// Define the schema for individual movie details
 const movieDetailsSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  overview: z.string().optional(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ).optional(),
  release_date: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  runtime: z.number().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
  popularity: z.number().optional(),
  tagline: z.string().optional(),
  original_language: z.string().optional(),
  original_title: z.string().optional(),
  status: z.string().optional(),
  budget: z.number().optional(),
  revenue: z.number().optional(),
  homepage: z.string().optional(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      logo_path: z.string().nullable().optional(),
      origin_country: z.string(),
    })
  ).optional(),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
  ).optional(),
  spoken_languages: z.array(
    z.object({
      iso_639_1: z.string(),
      name: z.string(),
    })
  ).optional(),
});


const moviesResponseSchema = z.object({
  results: z.array(movieDetailsSchema),
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
});

export { movieDetailsSchema, moviesResponseSchema };








// Define a schema for the cast/credits
export const castSchema = z.object({
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string(),
    })
  ).optional(),
});

import { useState, useEffect } from "react";
import { genres, movies } from "../data/_";
import "../index.css";
import MovieComponent from "./MovieComponent";
import ChevronRight from "./ChevronRight";
import axios from "axios";
import Loader from "./Loader";

export interface GenreInterface {
  category_id: string;
  category_name: string;
}

export interface MovieInterface {
  backdrop: string;
  cast: string[];
  classification: string;
  director: string;
  genres: string[];
  id: string;
  imdb_rating: number;
  length: string;
  overview: string;
  poster: string;
  released_on: string;
  slug: string;
  title: string;
}

export default function Home() {
  const [genre, setGenre] = useState<string[]>([]);
  const [movies, setMovies] = useState<MovieInterface[]>([]);

  const [loading, setLoading] = useState(true);

  const scrollClick = (direction: string, e: HTMLElement | Element) => {
    e.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  }

  useEffect(() => {

    axios.get("https://wookie.codesubmit.io/movies", {
      headers: {
        Authorization: "Bearer Wookie2021"
      }
    }).then(res => {
      let genres = new Set();

      res.data.movies.forEach((movie: MovieInterface) => {

        setMovies((movies) => [...movies, movie]);

        movie.genres.forEach((genre: string) => {
          genres.add(genre);

          setGenre((genres) => [...genres, genre]);
        });
      });

      setLoading(false);
    });
  }, []);
  
  if (loading) {
    return (<Loader />)
  } else {
    return (
      <div className="flex flex-col gap-10 p-2 items-center max-w-screen justify-center ">
        {genres.map((genre: GenreInterface) => (
        <div key={genre.category_id} className="flex flex-col px-2 py-1 justify-center max-w-full relative">
          <h1 className="text-2xl text-slate-800">{genre.category_name}</h1>
          <div className="grid grid-flow-col grid-rows-1   gap-2 overflow-auto test relative movies">
            {movies.filter((m: MovieInterface) => m.genres.includes(genre.category_name)).map((m: MovieInterface) => (
              <MovieComponent m={m} />
            ))}
          </div>
          <div className="buttonsLeft absolute w-full -bottom-10 right-0 flex justify-between px-3">
            <div className="flex items-center  p-2 hover:bg-[#00000010] rounded cursor-pointer" onClick={(e) => { scrollClick('left', e.currentTarget.parentElement?.previousElementSibling!) }}>
              <ChevronRight className="-ml-2 fill-orange-400 rotate-180" />
              <ChevronRight className="-ml-2 fill-orange-400 rotate-180" />
              <ChevronRight className="-ml-2 fill-orange-400 rotate-180" />
            </div>
            <div className="flex items-center  p-2 hover:bg-[#00000010] rounded cursor-pointer" onClick={(e) => { scrollClick('right', e.currentTarget.parentElement?.previousElementSibling!) }}>
              <ChevronRight className="-ml-2 fill-orange-400" />
              <ChevronRight className="-ml-2 fill-orange-400" />
              <ChevronRight className="-ml-2 fill-orange-400" />
            </div>
          </div>
        </div>
      ))}
      </div>
    )
  }
}
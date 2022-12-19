import React from "react";
import { MovieInterface } from "./Home";

const MovieComponent = ({ m }: { m: MovieInterface }) => {

  const handleClick = () => {
    localStorage.setItem("movie", JSON.stringify(m));

    window.location.href = `/movie/${m.id}`;
  };


  return (
    <div key={m.id} className="flex flex-col p-2 items-center min-w-[30vw] border cursor-pointer hover:bg-[#00000010] rounded"
      onClick={handleClick}
    >
      <img src={m.poster} alt={m.title}
        className="w-80 h-96 rounded"
      />
      <div className="flex flex-col px-4">
        <h1 className="text-xl text-slate-800">{m.title}</h1>
        <p className="text-slate-800 text-xs">Released: {m.released_on.slice(0, 10)}</p>
      </div>
      <p className="text-slate-800 text-sm px-4 py-4">{m.overview}</p>
    </div>
  );
};

export default MovieComponent;

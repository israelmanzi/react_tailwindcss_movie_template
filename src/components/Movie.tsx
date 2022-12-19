import { GenreInterface } from "./Home";

export default function Movie() {
    const movie = JSON.parse(localStorage.getItem("movie") || "[]");

    if (!localStorage.getItem("movie")) {
        return (
            <div className="container flex items-center justify-center h-[80vh]">
                <h1 className="text-center text-2xl">No movie found</h1>
            </div>
        )
    };

    const genres = movie.genres.map((genre: GenreInterface) => genre).join(", ");

    const castings = movie.cast.map((casting: unknown) => casting).join(", ");

    if (movie === null || movie === undefined || movie.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">No movie found</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{movie.movie_name}</h1>
            <div className="flex items-center mb-4">
                <img src={movie.poster} alt={`Poster for ${movie.title}`} className="w-64 h-64 rounded-lg mr-4" />
                <div className="flex flex-col justify-between gap-4 bg-gray-200 p-4 rounded-lg">
                    <div>
                        <h1 className="text-3xl p-2">{movie.title}</h1>
                    </div>
                    <div>
                        <span className="text-gray-800 mr-2">Release Date:</span>
                        <span className="text-gray-600">{movie.released_on.slice(0, 10)}</span>
                    </div>
                    <div>
                        <span className="text-gray-800 mr-2">Genre(s):</span>

                        <span className="text-gray-600 mr-2">{genres}</span>
                    </div>
                    <div>
                        <span className="text-gray-800 mr-2">Casting:</span>
                        <span className="text-gray-600 mr-2">{castings}, ...</span>
                    </div>
                    <div>
                        {/* <span className="text-gray-800 mr-2">Directors(s):</span> */}
                        {/* <span className="text-gray-600 mr-2">{directors}</span> */}
                    </div>
                    <div>
                        <span className="text-gray-800 mr-2">Length:</span>
                        <span className="text-gray-600 mr-2">{movie.length}</span>
                    </div>
                    <div>
                        <span className="text-gray-800 mr-2">IMDB rating:</span>
                        <span className="text-gray-600 mr-2">{movie.imdb_rating}</span>
                    </div>
                </div>
            </div>
            <div
                className="flex flex-col gap-4 bg-gray-200 justify-center items-center p-4 rounded-lg"
            >
                <p className="text-gray-800 leading-relaxed mb-4">
                    {movie.overview}
                </p>
            </div>
        </div>
    )
}

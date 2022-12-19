import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieInterface } from './Home';
import Loader from './Loader';
import axios from 'axios';
import Movie from './Movie';

export default function Search() {
    const { search } = useParams<{ search: string }>();
    const [loading, setLoading] = useState(true);

    const [movie, setMovie] = useState<MovieInterface>();

    const q = search?.toLocaleLowerCase().trim().replace(/ /g, "-");

    console.log(q);

    useEffect(() => {
        axios.get(`https://wookie.codesubmit.io/movies?q=${q}`, {
            headers: {
                Authorization: "Bearer Wookie2021"
            }
        })
            .then(res => {
                setMovie(res.data.movies);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [search]);

    if(loading) return <Loader />

    if(!movie || movie == null) {
        return (
            <div className="container flex items-center justify-center h-[80vh]">
                <h1 className="text-center text-2xl">No movies found</h1>
            </div>
        )
    } else {
        // localStorage.setItem("movie", JSON.stringify(movie));
        return <Movie />
    }
}
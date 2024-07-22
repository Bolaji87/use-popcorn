import { useEffect, useState } from "react";

import Header from "./components/header/header.jsx";
import Logo from "./components/header/Logo.jsx";
import Search from "./components/header/Search.jsx";
import NumResults from "./components/header/NumResults.jsx";

import Main from "./components/main/Main.jsx";
import Box from "./components/main/Box.jsx";

import MovieList from "./components/main/MovieList.jsx";
import WatchedBoxSummary from "./components/main/WatchedBoxSummary.jsx";
import WatchedList from "./components/main/WatchedList.jsx";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = "7b1a62ea";

export default function App() {
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const tempQuery = "interstellar";

  function handleSelectMovie(id) {
    setSelectedId((cur) => (id === cur ? null : id));
  }
  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  // vanilla dot .then method 👇🏻
  // useEffect(function () {
  //   fetch(
  //     ` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`
  //   ).then((res) => res.json().then((data) => setMovies(data.Search)));
  // }, []);

  //  Aysnc function 👇🏻

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          ` https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!response.ok)
          throw new Error("something went wrong with fetching movies");
        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setMovies(data.Search);
        console.log(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Header>

      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedBoxSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        /> */}

        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedBoxSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className="details">
      <button onClick={onCloseMovie} className="btn-back">
        &larr;
      </button>
      {selectedId}
    </div>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

import React, { useState } from "react";

export default function Main({
  avgUserRating,
  avgRuntime,
  avgImdbRating,
  isOpen1,
  setIsOpen1,
  isOpen2,
  setIsOpen2,
  watched,
  setWatched,
  movies,
  setMovies,
}) {
  return (
    <>
      <main className="main">
        <ListBox movies={movies} isOpen1={isOpen1} setIsOpen1={setIsOpen1} />
        <WatchedBox
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          watched={watched}
          setWatched={setWatched}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          avgImdbRating={avgImdbRating}
        />
      </main>
    </>
  );
}
function ListBox({ isOpen1, setIsOpen1, movies }) {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}
function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function WatchedBox({
  setIsOpen2,
  isOpen2,
  avgUserRating,
  avgRuntime,
  avgImdbRating,
  watched,
}) {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <div className="summary">
            <WatchedBoxSummary
              watched={watched}
              avgImdbRating={avgUserRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}
            />

            <WatchedList watched={watched} />
          </div>
        </>
      )}
    </div>
  );
}

function WatchedBoxSummary({
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
}) {
  return (
    <>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </>
  );
}

function WatchedList({ watched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <Watched movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}

function Watched({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

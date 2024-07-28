import React from "react";

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
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>``
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

export default WatchedList;

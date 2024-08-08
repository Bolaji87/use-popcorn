import { useState, useEffect } from "react";

const KEY = "7b1a62ea";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          ` https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
          // ` https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!response.ok)
          throw new Error("something went wrong with fetching movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        console.error(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    //  handleCloseMovie();
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

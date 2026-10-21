import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbApi';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    async function fetchSearchedMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchedMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (!searchQuery) {
      setSearchParams({});
      setMovies([]);
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <main className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input 
          type="text" 
          name="query" 
          defaultValue={query}
          placeholder="Search movies..." 
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p>Failed to load movies. Please try again.</p>}

      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.link}>
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

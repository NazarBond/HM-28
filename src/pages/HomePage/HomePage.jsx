import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      
      {loading && <p>Loading trending movies...</p>}
      {error && <p>Failed to load movies. Please try again later.</p>}
      
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

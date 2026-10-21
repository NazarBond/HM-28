import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Failed to load movie details.</p>;
  if (!movie) return null;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backButton}>Go back</Link>
      
      <div className={css.wrapper}>
        <img src={posterUrl} alt={movie.title} className={css.poster} />
        <div>
          <h1>{movie.title} ({movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'})</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li><Link to="cast">Cast</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

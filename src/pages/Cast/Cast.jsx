import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/tmdbApi';
import css from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Failed to load cast information.</p>;
  if (cast.length === 0) return <p>We don't have any cast information for this movie.</p>;

  return (
    <ul className={css.list}>
      {cast.map(actor => {
        const profileUrl = actor.profile_path
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : 'https://via.placeholder.com/100x150?text=No+Photo';

        return (
          <li key={actor.cast_id || actor.credit_id} className={css.item}>
            <img src={profileUrl} alt={actor.name} className={css.photo} />
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>Character: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}

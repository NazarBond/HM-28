import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdbApi';
import css from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Failed to load reviews.</p>;
  if (reviews.length === 0) return <p>We don't have any reviews for this movie.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(review => (
        <li key={review.id} className={css.item}>
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

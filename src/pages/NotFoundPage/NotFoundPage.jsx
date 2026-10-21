import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2>Oops! Page not found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={css.link}>Back to Home</Link>
    </div>
  );
}

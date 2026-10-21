import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";


const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const Cast = lazy(() => import("../../pages/Cast/Cast"));
const Reviews = lazy(() => import("../../pages/Reviews/Reviews"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense
        fallback={<div className={css.loader}>Завантаження сторінки...</div>}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

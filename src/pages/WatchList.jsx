import React from 'react';
import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { WatchListContext } from '../store/WatchList/context';
import { removeFromWatchList } from '../store/WatchList/actions';
import { Layout } from '../components/Layout';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';

export function WatchList() {
  const { watchlistState, watchlistDispatch } = useContext(WatchListContext);

  //folosim useEffect pentru a salva filmul in local storage
  const [_, setLocalStorageState] = useLocalStorage('watchlist', watchlistState);
  useEffect(() => {
    setLocalStorageState(watchlistState);
  }, [watchlistState, setLocalStorageState]);

  function handleRemoveFromWatchList(movieid) {
    const actionResult = removeFromWatchList(movieid);
    watchlistDispatch(actionResult);
  }
  return (
    <div>
      <Layout>
        <div className="my-5">
          <h1 className="mb-5 pt-3 text-center">Your watchlist</h1>
          {watchlistState.movies.length === 0 ? (
            <h3 className="mb-5 pt-3 text-center">
              There are no movies in the watchlist
            </h3>
          ) : (
            watchlistState.movies.map((movie) => {
              return (
                <div className="container my-5">
                  <div className="row bg-white rounded-4 shadow-sm border overflow-hidden g-0">
                    {/* Secțiunea Imaginii: se centrează automat pe mobil */}
                    <div className="col-md-4 bg-light d-flex align-items-center justify-content-center p-3">
                      <img
                        className="img-fluid rounded-3 shadow-sm"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                            : 'https://placeholder.com'
                        }
                        alt={movie.title}
                        style={{ maxHeight: '350px', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Secțiunea Detalii: padding mai mic pe mobil (p-3), mai mare pe desktop (p-4) */}
                    <div className="col-md-8 p-3 p-md-4 d-flex flex-column">
                      <div className="mb-2">
                        <h2 className="fw-bold h3 mb-1">{movie.title}</h2>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-calendar-event me-1"></i>
                          Release date: {movie.release_date}
                        </p>
                      </div>

                      <hr className="my-3 opacity-10" />

                      <div className="mb-4">
                        <h6 className="text-uppercase fw-bold text-muted small mb-2">
                          Description
                        </h6>
                        <p
                          className="text-secondary lh-base mb-0"
                          style={{ fontSize: '0.95rem' }}
                        >
                          {movie.overview}
                        </p>
                      </div>

                      <div className="mt-auto d-flex flex-column flex-md-row align-items-center justify-content-between border-top pt-3">
                        <div className="mb-3 mb-md-0 w-100 text-center text-md-start">
                          <span className="fs-5 fw-bold text-dark">
                            ⭐ {movie.vote_average?.toFixed(1)}
                          </span>
                          <span className="text-muted small"> / 10</span>
                        </div>

                        <Button
                          variant="outline-danger"
                          className="w-100 w-md-auto px-4 py-2 fw-bold shadow-sm rounded-pill"
                          onClick={() => handleRemoveFromWatchList(movie.id)}
                        >
                          Remove from watchlist
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Layout>
    </div>
  );
}

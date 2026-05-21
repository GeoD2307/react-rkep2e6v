import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { addToWatchList } from '../store/WatchList/actions';
import { WatchListContext } from '../store/WatchList/context';
import { Layout } from '../components/Layout';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';
import { WatchList } from './WatchList';


export function Movie() {
  const { watchlistState, watchlistDispatch } = useContext(WatchListContext);

  let { id } = useParams();




  const [__, setLocalStorageState] = useLocalStorage('watchlist', watchlistState);

  useEffect(() => {
    setLocalStorageState(watchlistState);
  }, [watchlistState, setLocalStorageState]);
  //cerem produsul de la APi si apoi actualizam stateul
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=fb5971af5b5f4e5a0fdd0b41d31d7b80`
    )
      .then((response) => response.json())
      .then((movie) => {
        setMovie(movie);
      });
  }, [id]);

  //extragem datele de interes din produs,practic prima cheie
  const movieInfo = movie || {};
  // product.gameInfo e true ori pana vin datele apare un obiect gol
  const { title, poster_path, release_date, overview, vote_average } =
    movieInfo;

  //functia care se ocupa de adaugarea in watchlist a produsului
  function handleAddToWatchList(movie) {
    const actionResult = addToWatchList(movie);
    watchlistDispatch(actionResult);
  }

  return (
    <div>
      <Layout>
        <div className="container my-4 my-md-5 px-3">
          {/* g-0 elimină spațiile inutile pe mobil între imagine și text */}
          <div className="row bg-white rounded-4 shadow-sm border overflow-hidden g-0">
            {/* IMAGINE: Pe mobil ocupă tot rândul, pe desktop 4 coloane */}
            <div className="col-md-4 bg-light d-flex align-items-center justify-content-center p-3">
              <img
                className="img-fluid rounded-3 shadow-sm"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : 'https://placeholder.com'
                }
                alt={title}
                /* Pe mobil limităm înălțimea la 300px ca să nu ocupe tot ecranul */
                style={{
                  maxHeight: '300px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* DETALII: Padding-ul se ajustează (p-3 pe mobil, p-4 pe desktop) */}
            <div className="col-md-8 p-3 p-md-4 d-flex flex-column">
              <div className="mb-2">
                <h1 className="fw-bold h3 mb-1">{title}</h1>
                <span className="badge bg-primary-subtle text-secondary border-0">
                  {release_date?.split('-')[0]}
                </span>
              </div>

              <hr className="my-3 opacity-10" />

              <div className="mb-3">
                <h5 className="text-uppercase fw-bold text-muted small mb-1">
                  Description
                </h5>
                <p
                  className="text-secondary  mb-0"
                  style={{ textAlign: 'left' }}
                >
                  {overview}
                </p>
              </div>

              {/* ZONA DE JOS: Pe mobil sunt puse unul sub altul (flex-column), pe desktop în linie (flex-md-row) */}
              <div className="mt-auto d-flex flex-column flex-md-row align-items-center justify-content-between border-top pt-3">
                <div className="mb-3 mb-md-0 w-100 text-center text-md-start">
                  <span className="fs-5 fw-bold text-dark">
                    ⭐ {vote_average?.toFixed(1)}
                  </span>
                  <span className="text-muted small"> / 10</span>
                </div>

                {/* Butonul: Pe mobil se face lat cât tot ecranul (w-100), pe desktop revine la auto */}

                <Button
                  variant="secondary"
                  className="w-100 w-md-auto px-4 py-2 fw-bold shadow-sm rounded-pill"
                  onClick={() => handleAddToWatchList(movie)}
                >
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

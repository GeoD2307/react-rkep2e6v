import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { addToWatchList } from '../store/WatchList/actions';
import { WatchListContext } from '../store/WatchList/context';
import { Layout } from '../components/Layout';
import useTimeout from '../utils/hooks/useTimeout';

export function Movies() {
  const { watchlistDispatch } = useContext(WatchListContext);
  //cerem  de la API si actualizam stateul
  const [movies, setMovies] = useState([]);

  //apelam hook-ul useTimeout pentru a afisa mesajul
  const [isAlertVisible, triggerAlertTimeout] = useTimeout();

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=fb5971af5b5f4e5a0fdd0b41d31d7b80'
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  //functia care se ocupa de adaugarea in watchlist a produsului
  function handleAddToWatchList(movie) {
    const actionResult = addToWatchList(movie);
    watchlistDispatch(actionResult);
  }

  //afisam pe ecran produsele venite de la API

  return (
    <div className="card h-100">
      <Layout>
        {/* ALERTA: Se afișează pe ecran doar când isAlertVisible este true */}
        {isAlertVisible && (
          <div
            className=" alert alert-dark position-fixed top-10 start-50 translate-middle-x mt-2 shadow fw-bold text-center z-3 px-3"
            style={{ width: 'max-content', maxWidth: '90vw' }}
          >
            Succesfully added to watchlist
          </div>
        )}

        <div className="d-flex flex-row flex-wrap justify-content-center  flex-grow-1">
          {movies.map((movie) => {
            return (
              <Card
                key={movie.id}
                style={{ maxWidth: '200px', flex: '1 1 200px' }}
                className="m-3"
              >
                <Link to={`/movie/${movie.id}`} className="text-dark">
                  <Card.Img
                    variant="top"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : 'https://placeholder.com'
                    }
                    style={{ height: '250px', objectFit: 'cover' }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text className="text-danger">
                      {movie.release_date}
                    </Card.Text>
                  </Card.Body>
                </Link>

                <div className="mt-auto">
                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={() => {
                      handleAddToWatchList({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        vote_average: movie.vote_average,
                      });
                      triggerAlertTimeout();
                    }}
                  >
                    Add to watchlist
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="text-center">
          <Link to="/" className="text-decoration-none mx-2 fs-5">
            See all the movies
          </Link>
        </div>
      </Layout>
    </div>
  );
}

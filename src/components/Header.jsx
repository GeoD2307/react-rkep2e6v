import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WatchListContext } from '../store/WatchList/context';
import Container from "react-bootstrap/Container"
import "./Header.css";

export function Header() {
  // Extragem state-ul din contextele aferente
  const { watchlistState } = useContext(WatchListContext);
  const navigate = useNavigate();

  const [searchMovie, setSearchMovie] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);

  function handleMenuClick (){
    setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
  };

 
  let dropdownMenuClasses = "custom-dropdown-menu";
  if (isDisplayed) {
    dropdownMenuClasses += " display-mobile-menu";
  }

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=fb5971af5b5f4e5a0fdd0b41d31d7b80'
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []);
      });
  }, []);

  // Filtrarea în timp real
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  function handleInputChange(event) {
    setSearchMovie(event.target.value);
    setShowResults(event.target.value.length > 0);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      if (filteredMovies.length > 0) {
        navigate(`/movie/${filteredMovies[0].id}`);
        setSearchMovie('');
        setShowResults(false);
      }
    }
  }

  return (
    <header className="Header">
      <nav className="nav bg-dark w-100">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="p-3 text-uppercase text-light text-decoration-none">
          Home
        </Link>
       
        <div className="menu-icon-container">
  <span
    onClick={handleMenuClick}
    className="material-icons menu-icon text-light d-md-none" 
    style={{ cursor: 'pointer', fontSize: '2rem', zIndex: 1001, position: 'relative' }}
  >
      {isDisplayed ? 'close' : 'menu'}
  </span>

  <ul className={dropdownMenuClasses}>
    {/* SEARCH ITEM */}
    <li className={`px-2 ${isDisplayed ? "w-100 mb-3" : ""}`}>
      <div className="position-relative search-wrapper">
        <span
          className="position-absolute top-50 translate-middle-y ms-3 text-secondary search-icon"
          style={{ zIndex: 10, pointerEvents: 'none' }}
        >
          🔍
        </span>
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary ps-5"
          placeholder="Search..."
          style={{ borderRadius: '20px' }}
          value={searchMovie}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchMovie && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        
        {showResults && (
          <ul className="results-dropdown list-group position-absolute w-100 shadow-lg" >
       
       {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <li
            key={movie.id}
            className="list-group-item list-group-item-action p-0 border-0"
          >
            <Link
              to={`/movie/${movie.id}`}
              className="text-decoration-none text-dark d-block px-3 py-2"
              onMouseDown={() => {
                navigate(`/movie/${movie.id}`);
                setSearchMovie('');
                setShowResults(false);
                setIsDisplayed(false);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-truncate fw-medium" style={{ maxWidth: '70%' }}>
                  {movie.title}
                </span>
                <small className="text-muted italic ms-2">
                  {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                </small>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li className="list-group-item text-muted small px-3 py-2 text-center">
          No movies found...
        </li>
      )}
          </ul>
        )}
      </div>
    </li>

    {/* LINK-URI NAVIGARE */}
    <li className="px-2">
      <Link className="text-uppercase text-light text-decoration-none hover-link" to="/movies">
        Movies
      </Link>
    </li>
    
    <li className="px-2">
      <Link className="text-uppercase text-light text-decoration-none hover-link" to="/watchlist">
        WatchList
        <span className="badge bg-secondary ms-1 rounded-pill">{watchlistState.movies.length}</span>
      </Link>
    </li>
  </ul>
</div>
       
           </Container>
      </nav>
    </header>
  );
}

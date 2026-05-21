//stateul initial
export const initialState = {
  //initial watchlist-ul este gol
  movies: [],
};

//reducerul primeste ca parametrii stateul
export function watchlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      {
    //verificam daca produsul continut in actiune este deja in watchlist
   const foundMovie = state.movies.find((movie) => {
          return movie.id === action.payload.id;
        });
  if (foundMovie) {
    return state;
  } else {
  const newState = {
    movies: [action.payload,...state.movies,]
      }
      return newState
  }
}

case 'REMOVE_FROM_WATCHLIST': {
  const filteredMovies = state.movies.filter((movie) => {
    return movie.id !== action.payload;
  });
  return {
    movies: filteredMovies,
  };
}
//nu uitam sa returnam stateul pe cazul default
default: {
  return state;
}
  }
}
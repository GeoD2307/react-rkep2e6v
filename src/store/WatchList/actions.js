//actiunea care adauga un produs la watchlist
export function addToWatchList(movie){
  return {
    type: 'ADD_TO_WATCHLIST',
    payload: movie
  }
}

//actiunea care sterge un produs de la watchlist
export function removeFromWatchList(movieid) {
  return {
    type: 'REMOVE_FROM_WATCHLIST',
    payload: movieid
  }
}
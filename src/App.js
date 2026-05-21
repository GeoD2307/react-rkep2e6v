import React from 'react';
import './style.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//importam paginile
import { Home } from './pages/Home';
import { WatchList } from './pages/WatchList';
import { Movies } from './pages/Movies';
import { Movie } from './pages/Movie';
import { Page404 } from './pages/Page404';
//importam contextul creat
import { WatchListContext } from './store/WatchList/context';
import { useReducer } from 'react';
import { watchlistReducer, initialState } from './store/WatchList/reducer';
import  {useLocalStorage}  from './utils/hooks/useLocalStorage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Page404 />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
  {
    path: '/movie/:id',
    element: <Movie />,
  },
  {
    path: '/watchlist',
    element: <WatchList />,
  },
]);
export default function App() {
  const [initialLocalStorageState] = useLocalStorage("watchlist", initialState);
  const [ watchlistState, watchlistDispatch] = useReducer(watchlistReducer, initialLocalStorageState);
  const watchlistContextValue = {
    watchlistState,
    watchlistDispatch,
  };

  return (
    <WatchListContext.Provider value={watchlistContextValue}>
      <div className="App primary">
        <RouterProvider router={router} />
      </div>
    </WatchListContext.Provider>
  );
}

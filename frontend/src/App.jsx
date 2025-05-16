import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import MoviesList from './view/MoviesList';
import MoviesAdd from './view/MoviesAdd';
import MoviesEdit from './view/MoviesEdit';
import Generos from './view/Generos';
import GenerosEdit from "./view/GenerosEdit";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand text-danger"
            href="/">&nbsp; Movies</a>
          <button className="navbar-toggler" type="button" datatoggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" ariaexpanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"
            id="navbarSupportedContent">
            <div className="d-flex align-items-center gap-2">
              <Link className="btn btn-success " to="/filmes/add">
                Add Movie
              </Link>
              <Link className="btn btn-success " to="/generos">
                Generos
              </Link>
            </div>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/filmes/add" element={<MoviesAdd />} />
              <Route path="/filmes/edit/:moviesId" element={<MoviesEdit />} />
              <Route path="/generos" element={<Generos />} />
              <Route path="/generos/edit/:id" element={<GenerosEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router >
  );
};
export default App;

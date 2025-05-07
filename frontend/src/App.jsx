import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import MoviesList from './view/MoviesList';
import MoviesAdd from './view/MoviesAdd';
import EmployeeEdit from './view/MoviesEdit';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bgdark">
          <a className="navbar-brand text-danger"
            href="/filmes"> Movies</a>
          <button className="navbar-toggler" type="button" datatoggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" ariaexpanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"
            id="navbarSupportedContent">
            <Link className="btn btn-success " to="/filmes/add">
              Add Employee
            </Link>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/filmes/" element={<MoviesList />} />
              <Route path="/filmes/add" element={<MoviesAdd />} />
              <Route path="/filmes/edit/:employeeId"
                element={<EmployeeEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router >
  );
};
export default App;

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Footer from "./components/Footer"; 
import NavbarMovies from './components/Navbar.jsx';
import MoviesList from './view/MoviesList';
import MoviesAdd from './view/MoviesAdd';
import MoviesEdit from './view/MoviesEdit';
import Generos from './view/Generos';
import GenerosEdit from "./view/GenerosEdit";
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavbarMovies />

        <main className="flex-grow-1">
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/filmes/add" element={<MoviesAdd />} />
              <Route path="/filmes/edit/:moviesId" element={<MoviesEdit />} />
              <Route path="/generos" element={<Generos />} />
              <Route path="/generos/edit/:id" element={<GenerosEdit />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

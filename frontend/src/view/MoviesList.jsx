import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Card, Row, Col } from "react-bootstrap"; // Adicionado Card, Row e Col
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Toaster, toast } from "sonner";
import API_URLS from "../config";


const MoviesList = () => {
    const [dataMovies, setdataMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); // Estado para armazenar os filmes filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
    const [movieIdToDelete, setMovieIdToDelete] = useState(null); // Estado para armazenar o ID do filme a ser excluído
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [viewMode, setViewMode] = useState("table"); // Estado para alternar entre tabela e cards

    useEffect(() => {
        LoadMovies();
    }, []);

    useEffect(() => {
        // Filtra os filmes com base no termo de pesquisa
        const filtered = dataMovies.filter((movie) =>
            movie.título.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchTerm, dataMovies]);

    function LoadMovies() {
        axios
            .get(API_URLS.FILMES.LIST)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataMovies(data);
                    setFilteredMovies(data); // Inicializa os filmes filtrados
                } else {
                    toast.error("Erro ao carregar os filmes!");
                }
            })
            .catch((error) => {
                toast.error("Erro no servidor: " + error.message);
            });
    }

    function SendDelete(movieId) {
        axios
            .post(API_URLS.FILMES.DELETE, { id: movieId })
            .then((response) => {
                if (response.data.success) {
                    toast.success("Filme eliminado com sucesso!");
                    LoadMovies(); // Atualiza a lista de filmes
                } else {
                    toast.error("Erro ao eliminar o filme: " + response.data.message);
                }
            })
            .catch((error) => {
                toast.error("Erro no servidor: " + error.message);
            });
        setShowModal(false); // Fecha o modal após a exclusão
    }

    const handleShowModal = (id) => {
        setMovieIdToDelete(id); // Define o ID do filme a ser excluído
        setShowModal(true); // Exibe o modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fecha o modal
        setMovieIdToDelete(null); // Limpa o ID do filme
    };

    function LoadTableData() {
        return filteredMovies.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.título}</td>
                    <td>{data.descrição}</td>
                    <td>{data.genero.genero}</td>
                    <td>
                        <img
                            src={data.foto}
                            alt={data.título}
                            style={{ width: "75px", height: "auto" }}
                        />
                    </td>
                    <td>
                        <div className="d-flex gap-2">
                            <Link className="btn btn-outline-info" to={"filmes/edit/" + data.id}>
                                Editar
                            </Link>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handleShowModal(data.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    function LoadCards() {
    return filteredMovies.map((movie, index) => (
        <Col md={4} className="mb-5 d-flex justify-content-center" key={index}>
            <div
                style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '500px',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#000',
                }}
            >
                <img
                    src={movie.foto}
                    alt={movie.título}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '20px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                        color: 'white',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        height: '100%',
                    }}
                >
                    <h5 className="fw-bold">{movie.título}</h5>

                    <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                        {movie.descrição.length > 51
                            ? movie.descrição.slice(0, 48) + '...'
                            : movie.descrição}
                    </p>

                    <div className="d-flex gap-2 mb-3">
                        <span
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            {movie.genero.genero}
                        </span>
                    </div>

                    {/* Botões na mesma linha */}
                    <div className="d-flex gap-2">
                        <button
                            className="btn text-dark fw-semibold"
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '50px',
                                padding: '10px',
                                width: '50%',
                            }}
                            onClick={() => (window.location.href = `/filmes/edit/${movie.id}`)}
                        >
                            Editar
                        </button>
                        <button
                            className="btn text-dark fw-semibold"
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '50px',
                                padding: '10px',
                                width: '50%',
                            }}
                            onClick={() => handleShowModal(movie.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </Col>
    ));
}



    return (
        <>
            <Toaster richColors position="top-right" />
            <h3 className="mt-4">Lista de Filmes</h3>

            {/* Campo de Pesquisa */}
            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar filmes pelo título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Botões para alternar entre tabela e cards */}
            <div className="mb-3 d-flex gap-2">
                <Button
                    variant={viewMode === "table" ? "primary" : "outline-primary"}
                    onClick={() => setViewMode("table")}
                >
                    Tabela
                </Button>
                <Button
                    variant={viewMode === "cards" ? "primary" : "outline-primary"}
                    onClick={() => setViewMode("cards")}
                >
                    Cards
                </Button>
            </div>

            {/* Exibição Condicional */}
            {viewMode === "table" ? (
                <table className="table table-hover table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">título</th>
                            <th scope="col">descrição</th>
                            <th scope="col">genero</th>
                            <th scope="col">foto</th>
                            <th colSpan="2">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <LoadTableData />
                    </tbody>
                </table>
            ) : (
                <Row>
                    <LoadCards />
                </Row>
            )}

            {/* Modal de Confirmação */}
           <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja apagar este filme?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => SendDelete(movieIdToDelete)}
                    >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal> 

        </>
    );
};

export default MoviesList;
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
                <tr
                    key={index}
                    className="align-middle"
                    style={{ transition: "background-color 0.2s ease" }}
                >
                    <th className="fw-bold text-muted">{data.id}</th>
                    <td className="fw-semibold">{data.título}</td>
                    <td style={{ maxWidth: "220px" }}>
                        {data.descrição.length > 60
                            ? data.descrição.slice(0, 57) + "..."
                            : data.descrição}
                    </td>
                    <td>{data.genero.genero}</td>
                    <td>
                        <img
                            src={data.foto}
                            alt={data.título}
                            style={{
                                width: "60px",
                                height: "auto",
                                borderRadius: "6px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            }}
                        />
                    </td>
                    <td>
                        <div className="d-flex justify-content-center gap-2">
                            <Link
                                className="fw-semibold text-dark shadow"
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "50px",
                                    padding: "6px 16px",
                                    border: "2px solid #ffffff",
                                }}
                                to={`filmes/edit/${data.id}`}
                            >
                                Editar
                            </Link>
                            <button
                                className="fw-semibold text-dark shadow"
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "50px",
                                    padding: "6px 16px",
                                    border: "2px solid #dc3545",
                                }}
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
            <div className="mt-5 mb-4">
                <h2 className="fw-bold" style={{ fontSize: '2rem', color: '#212529' }}>
                    🎬 Lista de Filmes
                </h2>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control shadow rounded-pill w-50"
                    style={{
                        borderRadius: '12px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        border: '1px solid #dee2e6',
                    }}
                    placeholder="🔎 Pesquisar filmes pelo título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>


            {/* Botões para alternar entre tabela e cards */}
            <div className="mb-4 d-flex gap-2">
                <button
                    className="fw-semibold text-dark shadow"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '50px',
                        padding: '10px 24px',
                        border: viewMode === 'table' ? '2px solid #0d6efd' : '2px solid transparent',
                        transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => setViewMode("table")}
                >
                    Tabela
                </button>

                <button
                    className="fw-semibold text-dark shadow"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '50px',
                        padding: '10px 24px',
                        border: viewMode === 'cards' ? '2px solid #0d6efd' : '2px solid transparent',
                        transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => setViewMode("cards")}
                >
                    Cards
                </button>
            </div>







            {/* Exibição Condicional */}
            {viewMode === "table" ? (

                <div className="table-responsive">
                    <table className="table align-middle border overflow-hidden table-striped mb-0  shadow rounded">
                        <thead className="table-dark">
                            <tr className="text-uppercase text-secondary" style={{ fontSize: "1rem" }}>
                                <th>&nbsp; #</th>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Gênero</th>
                                <th>Foto</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadTableData />
                        </tbody>
                    </table>
                </div>



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
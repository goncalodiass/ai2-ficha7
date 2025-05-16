import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Card, Row, Col } from "react-bootstrap"; // Adicionado Card, Row e Col
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Toaster, toast } from "sonner";

const urlAPI = "http://localhost:3000/filmes/list";

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
        const url = "http://localhost:3000/filmes/list";
        axios
            .get(url)
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
        const baseUrl = "http://localhost:3000/filmes/delete";
        axios
            .post(baseUrl, { id: movieId })
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
            <Col md={4} className="mb-4" key={index}>
                <Card className="h-100">
                    <Card.Img
                        variant="top"
                        src={movie.foto}
                        alt={movie.título}
                        style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Card.Body>
                        <Card.Title>{movie.título}</Card.Title>
                        <Card.Text>{movie.descrição}</Card.Text>
                        <Card.Text>
                            <small className="text-muted">Gênero: {movie.genero.genero}</small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                        <Button
                            variant="info"
                            onClick={() => (window.location.href = `/filmes/edit/${movie.id}`)}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleShowModal(movie.id)}
                        >
                            Excluir
                        </Button>
                    </Card.Footer>
                </Card>
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
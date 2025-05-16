import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Importando Modal e Button do React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Toaster, toast } from "sonner";

const urlAPI = "http://localhost:3000/filmes/list";

const MoviesList = () => {
    const [dataMovies, setdataMovies] = useState([]);
    const [movieIdToDelete, setMovieIdToDelete] = useState(null); // Estado para armazenar o ID do filme a ser excluído
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal

    useEffect(() => {
        LoadMovies();
    }, []);

    function LoadMovies() {
        const url = "http://localhost:3000/filmes/list";
        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataMovies(data);
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

    function LoadFillData() {
        return dataMovies.map((data, index) => {
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
                        <Link className="btn btn-outline-info" to={"filmes/edit/" + data.id} >Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => handleShowModal(data.id)} // Chama a função de deletar
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <Toaster richColors position="top-right" />

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
                    <LoadFillData />
                </tbody>
            </table>

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
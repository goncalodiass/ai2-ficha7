import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner"; // Importando Sonner
import { Link } from "react-router-dom"; // Certifique-se de importar o Link
import { Modal, Button } from "react-bootstrap"; // Importando Modal e Button do React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import API_URLS from "../config";

const Generos = () => {
    const [dataGeneros, setDataGeneros] = useState([]);
    const [novoGenero, setNovoGenero] = useState(""); // Estado para o novo gênero
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [generoIdToDelete, setGeneroIdToDelete] = useState(null); // Estado para armazenar o ID do gênero a ser excluído

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            const response = await axios.get(API_URLS.GENEROS.LIST);
            if (response.data.success) {
                setDataGeneros(response.data.data);
            } else {
                toast.error("Erro ao carregar os gêneros.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const handleAddGenero = async (e) => {
        e.preventDefault();

        if (!novoGenero.trim()) {
            toast.error("Por favor, insira um nome para o gênero.");
            return;
        }

        // Verifica se o gênero já existe
        const generoExistente = dataGeneros.find(
            (genero) => genero.genero.toLowerCase() === novoGenero.toLowerCase()
        );

        if (generoExistente) {
            toast.error("Este gênero já existe. Por favor, insira um nome diferente.");
            return;
        }

        try {
            const response = await axios.post(API_URLS.GENEROS.CREATE, {
                genero: novoGenero,
            });
            if (response.data.success) {
                toast.success("Gênero adicionado com sucesso!");
                setNovoGenero(""); // Limpa o campo de entrada
                fetchGeneros(); // Atualiza a lista de gêneros
            } else {
                toast.error("Erro ao adicionar o gênero.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(API_URLS.GENEROS.DELETE, { id: generoIdToDelete });
            if (response.data.success) {
                toast.success("Gênero eliminado com sucesso!");
                fetchGeneros(); // Atualiza a lista após exclusão
            } else if (response.data.error === "FOREIGN_KEY_CONSTRAINT") {
                toast.error("Não é possível excluir o gênero, pois ele está associado a filmes.");
            } else {
                toast.error("Erro ao excluir o gênero.");
            }
        } catch (error) {
            // Captura erros do servidor
            if (error.response && error.response.data && error.response.data.error === "FOREIGN_KEY_CONSTRAINT") {
                toast.error("Não é possível eliminar o gênero, pois ele está associado a filmes.");
            } else {
                toast.error("Erro no servidor: " + error.message);
            }
        }
        setShowModal(false); // Fecha o modal após a exclusão
    };

    const handleShowModal = (id) => {
        setGeneroIdToDelete(id); // Define o ID do gênero a ser excluído
        setShowModal(true); // Exibe o modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fecha o modal
        setGeneroIdToDelete(null); // Limpa o ID do gênero
    };

    const LoadFillData = () => {
        return dataGeneros.map((data, index) => (
            <tr key={index}>
                <th>{data.id}</th>
                <td>{data.genero}</td>
                <td>
                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-info" to={`/generos/edit/${data.id}`}>
                            Editar
                        </Link>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => handleShowModal(data.id)}
                        >
                            Apagar
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container">
            <Toaster position="top-right" richColors /> {/* Sonner Toaster */}
            <h3 className="mt-4">Lista de Gêneros</h3>

            {/* Formulário para adicionar novo gênero */}
            <form className="mb-4" onSubmit={handleAddGenero}>
                <div className="d-flex align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        id="novoGenero"
                        placeholder="Insira o nome do gênero"
                        value={novoGenero}
                        onChange={(e) => setNovoGenero(e.target.value)}
                        style={{ minWidth: 200, maxWidth: 400, flex: 1 }}
                    />
                    <button type="submit" className="btn btn-primary">Adicionar</button>
                    <button type="reset" className="btn btn-secondary" onClick={() => setNovoGenero("")} > Limpar </button>
                </div>
            </form>
            {/* Tabela de gêneros */}
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Gênero</th>
                        <th colSpan="2">Ação</th>
                    </tr>
                </thead>
                <tbody>{LoadFillData()}</tbody>
            </table>

            {/* Modal de Confirmação */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja apagar este gênero?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Generos;
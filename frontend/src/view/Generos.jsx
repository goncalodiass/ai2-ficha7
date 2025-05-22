import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import API_URLS from "../config";

import { FaTrash, FaEdit } from "react-icons/fa";


const Generos = () => {
    const [dataGeneros, setDataGeneros] = useState([]);
    const [novoGenero, setNovoGenero] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [generoIdToDelete, setGeneroIdToDelete] = useState(null);

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            const response = await axios.get(API_URLS.GENEROS.LIST);
            if (response.data.success) {
                setDataGeneros(response.data.data);
            } else {
                toast.error("Erro ao carregar os Generos.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const handleAddGenero = async (e) => {
        e.preventDefault();

        if (!novoGenero.trim()) {
            toast.error("Por favor, insira um nome para o Genero.");
            return;
        }

        const generoExistente = dataGeneros.find(
            (genero) => genero.genero.toLowerCase() === novoGenero.toLowerCase()
        );

        if (generoExistente) {
            toast.error("Este Genero já existe. Por favor, insira um nome diferente.");
            return;
        }

        try {
            const response = await axios.post(API_URLS.GENEROS.CREATE, {
                genero: novoGenero,
            });
            if (response.data.success) {
                toast.success("Genero adicionado com sucesso!");
                setNovoGenero("");
                fetchGeneros();
            } else {
                toast.error("Erro ao adicionar o Genero.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(API_URLS.GENEROS.DELETE, { id: generoIdToDelete });
            if (response.data.success) {
                toast.success("Genero eliminado com sucesso!");
                fetchGeneros();
            } else if (response.data.error === "FOREIGN_KEY_CONSTRAINT") {
                toast.error("Não é possível excluir o Genero, pois está associado a filmes.");
            } else {
                toast.error("Erro ao excluir o Genero.");
            }
        } catch (error) {
            if (error.response?.data?.error === "FOREIGN_KEY_CONSTRAINT") {
                toast.error("Não é possível eliminar o Genero, pois está associado a filmes.");
            } else {
                toast.error("Erro no servidor: " + error.message);
            }
        }
        setShowModal(false);
    };

    const handleShowModal = (id) => {
        setGeneroIdToDelete(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setGeneroIdToDelete(null);
    };

    const LoadFillData = () =>
        dataGeneros.map((data, index) => (
            <tr key={index} className="align-middle">
                <th className="text-muted">{data.id}</th>
                <td className="fw-semibold">{data.genero}</td>
                <td>

                    <div className="d-flex gap-2 justify-content-end">
                        <Link
                            className="btn btn-sm d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                            to={`/generos/edit/${data.id}`}
                            title="Editar"
                        >
                            <FaEdit />
                        </Link>

                        <button
                            className="btn btn-sm d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                            onClick={() => handleShowModal(data.id)}
                            title="Eliminar"
                        >
                            <FaTrash />
                        </button>
                    </div>

                </td>
            </tr>
        ));

    return (
        <div className="container mt-5">
            <Toaster position="top-right" richColors />
            <h2 className="fw-bold mb-4">
                Lista de Generos
            </h2>

            {/* Formulário para adicionar novo Genero */}
            <form className="mb-4" onSubmit={handleAddGenero}>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control shadow rounded rounded-pill w-25"
                        placeholder="Novo genero"
                        value={novoGenero}
                        onChange={(e) => setNovoGenero(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            padding: "10px 16px",
                        }}
                    />
                    <button
                        type="submit"
                        className="btn fw-semibold text-dark shadow"
                        style={{
                            backgroundColor: "#fff",
                            border: "2px solid #0d6efd",
                            borderRadius: "50px",
                            padding: "10px 24px",
                        }}
                    >
                        Adicionar
                    </button>
                    <button
                        type="reset"
                        className="btn fw-semibold text-dark shadow"
                        style={{
                            backgroundColor: "#fff",
                            border: "2px solid #6c757d",
                            borderRadius: "50px",
                            padding: "10px 24px",
                        }}
                        onClick={() => setNovoGenero("")}
                    >
                        Limpar
                    </button>
                </div>
            </form>

            {/* Tabela estilizada */}
            <div className="table-responsive shadow-sm rounded">
                <table className="table align-middle overflow-hidden table-striped mb-0 ">
                    <thead className="table-dark">
                        <tr className="text-uppercase text-secondary" style={{ fontSize: "0.95rem" }}>
                            <th>ID</th>
                            <th>Genero</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>{LoadFillData()}</tbody>
                </table>
            </div>

            {/* Modal de Confirmação */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja apagar este Genero?</Modal.Body>
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

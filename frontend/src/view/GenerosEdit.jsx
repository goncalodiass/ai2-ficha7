import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Modal, Button } from "react-bootstrap";

const baseUrl = "http://localhost:3000";

const GenerosEdit = () => {
    const [genero, setGenero] = useState("");
    const [generosExistentes, setGenerosExistentes] = useState([]); // Lista de gêneros existentes
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchGenero = async () => {
            try {
                const response = await axios.get(`${baseUrl}/genero/get/${id}`);
                if (response.data.success) {
                    setGenero(response.data.data[0].genero);
                } else {
                    toast.error("Erro ao carregar os dados do gênero.");
                }
            } catch (error) {
                toast.error("Erro no servidor: " + error.message);
            }
        };

        const fetchGenerosExistentes = async () => {
            try {
                const response = await axios.get(`${baseUrl}/genero/list`);
                if (response.data.success) {
                    setGenerosExistentes(response.data.data.map((g) => g.genero.toLowerCase()));
                } else {
                    toast.error("Erro ao carregar a lista de gêneros.");
                }
            } catch (error) {
                toast.error("Erro no servidor: " + error.message);
            }
        };

        fetchGenero();
        fetchGenerosExistentes();
    }, [id]);

    const handleUpdate = async () => {
        if (!genero.trim()) {
            toast.error("O nome do gênero não pode estar vazio.");
            return;
        }

        // Verifica se o nome do gênero já existe (ignorando o gênero atual)
        if (generosExistentes.includes(genero.toLowerCase())) {
            toast.error("Este nome de gênero já existe. Por favor, insira um nome diferente.");
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}/genero/update/${id}`, { genero });
            if (response.data.success) {
                toast.success("Gênero atualizado com sucesso!");
            } else {
                toast.error("Erro ao atualizar o gênero.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
        setShowModal(false); // Fecha o modal após a atualização
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container">
            <Toaster position="top-right" richColors />
            <h3 className="mt-4">Editar Gênero</h3>
            <div className="form-group row mb-3">
                <label htmlFor="genero" className="col-sm-2 col-md-1 col-form-label">Gênero</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="genero"
                        placeholder="Nome do gênero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary" onClick={handleShowModal}>
                    Atualizar
                </button>
                <Link to="/generos" className="btn btn-secondary">
                    Voltar
                </Link>
            </div>

            {/* Modal de Confirmação */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Atualização</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja guardar as alterações no gênero?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GenerosEdit;
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Modal, Button } from "react-bootstrap";
import API_URLS from "../config";

const GenerosEdit = () => {
  const [genero, setGenero] = useState("");
  const [generosExistentes, setGenerosExistentes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await axios.get(API_URLS.GENEROS.GET(id));
        if (response.data.success) {
          setGenero(response.data.data[0].genero);
        } else {
          toast.error("Erro ao carregar os dados do Genero.");
        }
      } catch (error) {
        toast.error("Erro no servidor: " + error.message);
      }
    };

    const fetchGenerosExistentes = async () => {
      try {
        const response = await axios.get(API_URLS.GENEROS.LIST);
        if (response.data.success) {
          setGenerosExistentes(
            response.data.data
              .filter((g) => g.id !== Number(id))
              .map((g) => g.genero.toLowerCase())
          );
        } else {
          toast.error("Erro ao carregar a lista de Generos.");
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
      toast.error("O nome do Genero não pode estar vazio.");
      return;
    }

    if (generosExistentes.includes(genero.toLowerCase())) {
      toast.error("Este nome de Genero já existe.");
      return;
    }

    try {
      const response = await axios.put(API_URLS.GENEROS.UPDATE(id), { genero });
      if (response.data.success) {
        toast.success("Genero atualizado com sucesso!");
        setTimeout(() => navigate("/generos"), 1500);
      } else {
        toast.error("Erro ao atualizar o Genero.");
      }
    } catch (error) {
      toast.error("Erro no servidor: " + error.message);
    }

    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <Toaster position="top-right" richColors />
      <h2 className="fw-bold mb-4">Editar Genero</h2>

      <div className="mb-4">
        <label htmlFor="genero" className="form-label fw-semibold">Nome do Genero</label>
        <input
          type="text"
          className="form-control shadow-sm"
          style={{ borderRadius: "12px", padding: "10px 16px", maxWidth: "400px" }}
          id="genero"
          placeholder="Ex: Comédia, Ação, Terror..."
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button
          className="fw-semibold text-dark"
          style={{
            backgroundColor: "#fff",
            border: "2px solid #0d6efd",
            borderRadius: "50px",
            padding: "10px 24px",
          }}
          onClick={() => setShowModal(true)}
        >
          Atualizar
        </button>
        <Link
          to="/generos"
          className="fw-semibold text-dark"
          style={{
            backgroundColor: "#fff",
            border: "2px solid #6c757d",
            borderRadius: "50px",
            padding: "10px 24px",
            textDecoration: "none",
          }}
        >
          Voltar
        </Link>
      </div>

      {/* Modal de confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Atualização</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja guardar as alterações no Genero?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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

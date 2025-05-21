import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Toaster, toast } from "sonner";

const FormFilme = ({
  modo = "adicionar",
  titulo,
  descricao,
  foto,
  generoId,
  generos = [],
  onChange,
  onSubmit
}) => {
  const [isValidFoto, setIsValidFoto] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (foto) {
      const img = new Image();
      img.onload = () => setIsValidFoto(true);
      img.onerror = () => setIsValidFoto(false);
      img.src = foto;
    } else {
      setIsValidFoto(true);
    }
  }, [foto]);

  const handleConfirm = () => {
    if (!titulo || !descricao || !foto || !generoId) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    if (!isValidFoto) {
      toast.error("O link da foto é inválido.");
      return;
    }

    if (modo === "editar") {
      setShowModal(true);
    } else {
      onSubmit();
    }
  };

  const handleModalConfirm = () => {
    onSubmit();
    setShowModal(false);
  };

  return (
    <div className="container mt-5 mb-5 p-4 rounded shadow bg-white">
      <Toaster richColors position="top-right" />
      <h2 className="fw-bold mb-4">
        {modo === "adicionar" ? "🎬 Adicionar Novo Filme" : "✏️ Editar Filme"}
      </h2>

      <div className="mb-3">
        <label className="form-label fw-semibold">Título</label>
        <input
          type="text"
          className="form-control shadow-sm"
          style={{ borderRadius: "12px", padding: "10px 15px" }}
          value={titulo}
          onChange={(e) => onChange("titulo", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Descrição</label>
        <textarea
          className="form-control shadow-sm"
          style={{ borderRadius: "12px", padding: "10px 15px" }}
          rows="3"
          value={descricao}
          onChange={(e) => onChange("descricao", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Link da Foto</label>
        <input
          type="text"
          className="form-control shadow-sm"
          style={{ borderRadius: "12px", padding: "10px 15px" }}
          value={foto}
          onChange={(e) => onChange("foto", e.target.value)}
        />
      </div>

      {foto && (
  <div className="mb-4">
    <label className="form-label fw-semibold">Pré-visualização</label>
    <div className="d-flex align-items-center">
      {isValidFoto ? (
        <img
          src={foto}
          alt="Pré-visualização"
          style={{
            width: "150px",
            height: "auto",
            borderRadius: "12px",
            border: "1px solid #dee2e6",
            padding: "5px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
      ) : (
        <p className="text-danger mb-0">O link da foto é inválido.</p>
      )}
    </div>
  </div>
)}


      <div className="mb-4">
        <label className="form-label fw-semibold">Genero</label>
        <select
          className="form-select shadow-sm"
          style={{ borderRadius: "12px", padding: "10px 15px" }}
          value={generoId}
          onChange={(e) => onChange("generoId", e.target.value)}
        >
          <option value="" disabled>
            Escolha um Genero...
          </option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>
              {genero.genero}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="fw-bold text-dark"
        style={{
          backgroundColor: "#fff",
          border: "2px solid #0d6efd",
          borderRadius: "50px",
          padding: "10px 30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
        onClick={handleConfirm}
      >
        {modo === "adicionar" ? "Guardar Filme" : "Atualizar Filme"}
      </button>

      {modo === "editar" && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Atualização</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja atualizar este filme?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleModalConfirm}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FormFilme;

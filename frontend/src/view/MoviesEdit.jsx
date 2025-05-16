import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Importando Modal e Button do React-Bootstrap
import { Toaster, toast } from "sonner";
import API_URLS from "../config";


const MoviesEdit = () => {
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [isValidFoto, setIsValidFoto] = useState(true); // Estado para validar o link da foto
    const [stringRole, setstringRole] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [originalData, setOriginalData] = useState({}); // Armazena os valores originais do filme

    const { moviesId } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(API_URLS.FILMES.GET(moviesId));
                if (res.data.success) {
                    const data = res.data.data[0];
                    setcampTítulo(data.título);
                    setcampDescrição(data.descrição);
                    setcampFoto(data.foto);
                    setstringRole(data.genero.genero);
                    setselectGenero(data.generoId);
                    setOriginalData({
                        título: data.título,
                        descrição: data.descrição,
                        foto: data.foto,
                        generoId: data.generoId,
                    }); // Salva os valores originais
                } else {
                    toast.error("Erro ao carregar os dados do filme.");
                }
            } catch (error) {
                toast.error("Erro no servidor: " + error.message);
            }
        };

        const fetchGeneros = async () => {
            try {
                const response = await axios.get(API_URLS.GENEROS.LIST);
                if (response.data.success) {
                    setGeneros(response.data.data);
                } else {
                    toast.error("Erro ao carregar os gêneros.");
                }
            } catch (error) {
                toast.error("Erro ao buscar os gêneros: " + error.message);
            }
        };

        fetchMovie();
        fetchGeneros();
    }, [moviesId]);

    useEffect(() => {
        if (campFoto) {
            const img = new Image();
            img.onload = () => setIsValidFoto(true);
            img.onerror = () => setIsValidFoto(false);
            img.src = campFoto;
        } else {
            setIsValidFoto(true);
        }
    }, [campFoto]);

    const handleShowModal = () => {
        setShowModal(true); // Exibe o modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fecha o modal
    };

    const handleConfirmUpdate = () => {
        if (isDataChanged()) {
            SendUpdate();
        } else {
            toast.error("Nenhuma alteração foi feita nos campos.");
        }
        setShowModal(false);
    };

    const isDataChanged = () => {
        // Verifica se os valores atuais são diferentes dos originais
        return (
            campTítulo !== originalData.título ||
            campDescrição !== originalData.descrição ||
            campFoto !== originalData.foto ||
            selectGenero !== originalData.generoId
        );
    };

    function SendUpdate() {
        const datapost = {
            titulo: campTítulo,
            descricao: campDescrição,
            foto: campFoto,
            genero: selectGenero,
        };

        axios
            .put(API_URLS.FILMES.UPDATE(moviesId), datapost)
            .then((response) => {
                if (response.data.success) {
                    toast.success(`Filme "${datapost.titulo}" editado com sucesso!`);
                    
                    // Atualiza os valores originais para refletir os novos dados
                    setOriginalData({
                        título: campTítulo,
                        descrição: campDescrição,
                        foto: campFoto,
                        generoId: selectGenero,
                    });
                } else {
                    toast.error("Erro ao atualizar o filme: " + response.data.message);
                }
            })
            .catch((error) => {
                toast.error("Erro no servidor: " + error.message);
            });
    }

    return (
        <div>
            <Toaster richColors position="top-right" />
            <div className="form-group row mb-3">
                <label htmlFor="inputPassword4" className="col-sm-2 col-md-1 col-formlabel">Título</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título"
                        value={campTítulo}
                        onChange={(e) => setcampTítulo(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="inputEmail4" className="col-sm-2 col-md-1 col-formlabel">Descrição</label>
                <div className="col-sm-10">
                    <textarea
                        className="form-control"
                        placeholder="Descrição"
                        value={campDescrição}
                        onChange={(e) => setcampDescrição(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="inputPhoto" className="col-sm-2 col-md-1 col-formlabel">Link da Foto</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Insira o link da foto"
                        value={campFoto}
                        onChange={(e) => setcampFoto(e.target.value)}
                    />
                </div>
            </div>
            {campFoto && (
                <div className="form-group row mb-3">
                    {isValidFoto ? (
                        <>
                            <label htmlFor="previewLink" className="col-sm-2 col-md-1 col-formlabel">Preview da Foto</label>
                            <div className="col-sm-10">
                                <img
                                    src={campFoto}
                                    alt="Pré-visualização"
                                    style={{ width: "150px", height: "auto", border: "1px solid #ddd", padding: "5px" }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="col-sm-10">
                            <p style={{ color: "red" }}>O link da foto é inválido.</p>
                        </div>
                    )}
                </div>
            )}
            <div className="form-group row mb-3">
                <label htmlFor="inputState" className="col-sm-2 col-md-1 col-formlabel">Gênero</label>
                <div className="col-sm-10">
                    <select
                        id="inputState"
                        className="form-control"
                        value={selectGenero}
                        onChange={(e) => setselectGenero(e.target.value)}
                    >
                        <option value="" disabled>
                            {stringRole || "Selecione um gênero"}
                        </option>
                        {generos.map((genero) => (
                            <option key={genero.id} value={genero.id}>
                                {genero.genero}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleShowModal} // Exibe o modal ao clicar
            >
                Atualizar
            </button>

            {/* Modal de Confirmação */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Atualização</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja atualizar este filme?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MoviesEdit;
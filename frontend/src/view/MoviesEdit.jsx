import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Importando Modal e Button do React-Bootstrap
import { Toaster, toast } from "sonner";
import API_URLS from "../config";

        import FormFilme from "../components/FormFilme";

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

<FormFilme
  modo="editar"
  titulo={campTítulo}
  descricao={campDescrição}
  foto={campFoto}
  generoId={selectGenero}
  generos={generos}
  onChange={(field, value) => {
    if (field === "titulo") setcampTítulo(value);
    if (field === "descricao") setcampDescrição(value);
    if (field === "foto") setcampFoto(value);
    if (field === "generoId") setselectGenero(value);
  }}
  onSubmit={handleConfirmUpdate}
  
/>

    );
};

export default MoviesEdit;
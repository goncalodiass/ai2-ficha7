import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';

import { Toaster, toast } from 'sonner';
import API_URLS from "../config";
import FormFilme from "../components/FormFilme";
import { useNavigate } from "react-router-dom";

const MoviesAdd = () => {
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]);
    const [isValidFoto, setIsValidFoto] = useState(true); // Estado para validar o link da foto


    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const response = await axios.get(API_URLS.GENEROS.LIST);
                if (response.data.success) {
                    setGeneros(response.data.data);
                } else {
                    alert("Erro ao carregar os gêneros.");
                }
            } catch (error) {
                alert("Erro ao buscar os gêneros: " + error.message);
            }
        };

        fetchGeneros();
    }, []);

    // Validação do link da foto
    useEffect(() => {
        if (campFoto) {
            const img = new Image();
            img.onload = () => setIsValidFoto(true);
            img.onerror = () => setIsValidFoto(false);
            img.src = campFoto;
        } else {
            setIsValidFoto(true); // Reseta a validação se o campo estiver vazio
        }
    }, [campFoto]);

    function SendSave(e) {
  if (e) e.preventDefault();

  if (!campTítulo || !campDescrição || !campFoto || !selectGenero) {
    toast.error('Por favor, preencha todos os campos.');
    return;
  }

  if (!isValidFoto) {
    toast.error("O link da foto é inválido.");
    return;
  }

  const datapost = {
    titulo: campTítulo,
    descricao: campDescrição,
    foto: campFoto,
    genero: selectGenero
  };

  setIsLoading(true); // Inicia o loading

  axios.post(API_URLS.FILMES.CREATE, datapost)
    .then(response => {
      if (response.data.success) {
        toast.success(`Filme "${datapost.titulo}" criado com sucesso!`);

        // Limpa os campos
        setcampTítulo("");
        setcampDescrição("");
        setcampFoto("");
        setselectGenero("");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Erro ao guardar o filme: " + response.data.message);
      }
    })
    .catch(error => {
      toast.error("Erro no servidor: " + error.message);
    })
    .finally(() => {
      setIsLoading(false); // Termina o loading
    });
}



    return (

        <FormFilme
            modo="adicionar"
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
            onSubmit={SendSave}
        />

    );
};

export default MoviesAdd;
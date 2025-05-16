import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';

import { Toaster, toast } from 'sonner';
import API_URLS from "../config";

const MoviesAdd = () => {
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]);
    const [isValidFoto, setIsValidFoto] = useState(true); // Estado para validar o link da foto

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
            //alert("Por favor, preencha todos os campos.");
            toast.error('Por favor, preencha todos os campos.');

            return;
        }
        if (!isValidFoto) {
            alert("O link da foto é inválido.");
            return;
        }

        const datapost = {
            titulo: campTítulo,
            descricao: campDescrição,
            foto: campFoto,
            genero: selectGenero
        };
        axios.post(API_URLS.FILMES.CREATE, datapost)
            .then(response => {
                if (response.data.success) {
                    toast.success(`Filme "${datapost.titulo}" criado com sucesso!`);
                } else {
                    alert("Erro ao guardar o filme: " + response.data.message);
                }
            }).catch(error => {
                alert("Erro no servidor: " + error.message);
            });
    }

    return (
        <div>
            <Toaster richColors position="top-right" /> 
            <div className="form-group row mb-3">
                <label htmlFor="title" className="col-sm-2 col-md-1 col-formlabel">Título</label>
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
                <label htmlFor="description" className="col-sm-2 col-md-1 col-formlabel">Descrição</label>
                <div className="col-sm-10">
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Uma breve descrição"
                        value={campDescrição}
                        onChange={(e) => setcampDescrição(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="photoLink" className="col-sm-2 col-md-1 col-formlabel">Link da Foto</label>
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
            <br />
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
                <label htmlFor="role" className="col-sm-2 col-md-1 col-formlabel">Gênero</label>
                <div className="col-sm-10">
                    <select
                        id="inputState"
                        className="form-control"
                        value={selectGenero}
                        onChange={(e) => setselectGenero(e.target.value)}
                    >
                        <option value="" disabled>Escolha um gênero...</option>
                        {generos.map((genero) => (
                            <option key={genero.id} value={genero.id}>
                                {genero.genero}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={SendSave}
            >
                Guardar
            </button>
        </div>
    );
};

export default MoviesAdd;
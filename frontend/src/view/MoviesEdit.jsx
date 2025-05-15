import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Toaster, toast } from 'sonner';

const baseUrl = "http://localhost:3000";

const MoviesEdit = () => {
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [isValidFoto, setIsValidFoto] = useState(true); // Estado para validar o link da foto
    const [stringRole, setstringRole] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]);

    const { moviesId } = useParams();

    useEffect(() => {
        // Busca os dados do filme
        const fetchMovie = async () => {
            const url = `${baseUrl}/filmes/get/${moviesId}`;
            try {
                const res = await axios.get(url);
                if (res.data.success) {
                    const data = res.data.data[0];
                    setcampTítulo(data.título);
                    setcampDescrição(data.descrição);
                    setcampFoto(data.foto);
                    setstringRole(data.genero.genero);
                    setselectGenero(data.generoId);
                } else {
                    alert("Erro ao carregar os dados do filme.");
                }
            } catch (error) {
                alert("Erro no servidor: " + error.message);
            }
        };

        // Pesquisar os gêneros da API
        const fetchGeneros = async () => {
            try {
                const response = await axios.get(`${baseUrl}/genero/list`);
                if (response.data.success) {
                    setGeneros(response.data.data);
                } else {
                    alert("Erro ao carregar os gêneros.");
                }
            } catch (error) {
                alert("Erro ao buscar os gêneros: " + error.message);
            }
        };

        fetchMovie();
        fetchGeneros();
    }, [moviesId]);

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

    function SendUpdate() {
        const url = `${baseUrl}/filmes/update/${moviesId}`;
        const datapost = {
            titulo: campTítulo,
            descricao: campDescrição,
            foto: campFoto,
            genero: selectGenero,
        };

        console.log("Dados enviados para o backend:", datapost);

        axios
            .put(url, datapost)
            .then((response) => {
                if (response.data.success) {
                    toast.success(`Filme "${datapost.titulo}" editado com sucesso!`);
                } else {
                    alert("Erro ao atualizar o filme: " + response.data.message);
                }
            })
            .catch((error) => {
                alert("Erro no servidor: " + error.message);
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
                type="submit"
                className="btn btn-primary"
                onClick={SendUpdate}
            >
                Atualizar
            </button>
        </div>
    );
};

export default MoviesEdit;
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:3000";

const MoviesEdit = () => {
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringRole, setstringRole] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]); // Estado para armazenar os gêneros

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
                    alert("Filme atualizado com sucesso!");
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
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título"
                        value={campTítulo}
                        onChange={(e) => setcampTítulo(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Descrição</label>
                    <textarea
                        className="form-control"
                        placeholder="Descrição"
                        value={campDescrição}
                        onChange={(e) => setcampDescrição(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Gênero</label>
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
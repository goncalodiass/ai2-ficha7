import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';

const MoviesAdd = () => {
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]); // Estado para armazenar os gêneros

    useEffect(() => {
        // Busca os gêneros da API
        const fetchGeneros = async () => {
            try {
                const response = await axios.get("http://localhost:3000/genero/list"); // Substitua pela URL correta da sua API
                if (response.data.success) {
                    setGeneros(response.data.data); // Supondo que os gêneros estão em response.data.data
                } else {
                    alert("Erro ao carregar os gêneros.");
                }
            } catch (error) {
                alert("Erro ao buscar os gêneros: " + error.message);
            }
        };

        fetchGeneros();
    }, []);

    function SendSave(e) {
        if (e) e.preventDefault();
        const baseUrl = "http://localhost:3000/filmes/create";
        const datapost = {
            titulo: campTítulo,
            descricao: campDescrição,
            foto: campFoto,
            genero: selectGenero
        };
        axios.post(baseUrl, datapost)
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message);
                } else {
                    alert("Erro ao salvar o filme: " + response.data.message);
                }
            }).catch(error => {
                alert("Erro no servidor: " + error.message);
            });
    }

    return (
        <div>
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
                                {genero.genero} {/* Supondo que o nome do gênero está em genero.genero */}
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
                Salvar
            </button>
        </div>
    );
};

export default MoviesAdd;
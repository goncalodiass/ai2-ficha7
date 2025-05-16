import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner"; // Importando Sonner
import { Link } from "react-router-dom"; // Certifique-se de importar o Link
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Generos = () => {
    const [dataGeneros, setDataGeneros] = useState([]);
    const [novoGenero, setNovoGenero] = useState(""); // Estado para o novo gênero

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            const response = await axios.get("http://localhost:3000/genero/list");
            if (response.data.success) {
                setDataGeneros(response.data.data);
            } else {
                toast.error("Erro ao carregar os gêneros.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const handleAddGenero = async (e) => {
        e.preventDefault();
        if (!novoGenero.trim()) {
            toast.error("Por favor, insira um nome para o gênero.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/genero/create", {
                genero: novoGenero,
            });
            if (response.data.success) {
                toast.success("Gênero adicionado com sucesso!");
                setNovoGenero(""); // Limpa o campo de entrada
                fetchGeneros(); // Atualiza a lista de gêneros
            } else {
                toast.error("Erro ao adicionar o gênero.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const handleDelete = async (generoId) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este gênero?");
        if (!confirmDelete) return;

        try {
            const response = await axios.post("http://localhost:3000/genero/delete", { id: generoId });
            if (response.data.success) {
                toast.success("Gênero excluído com sucesso!");
                fetchGeneros(); // Atualiza a lista após exclusão
            } else if (response.data.error === "FOREIGN_KEY_CONSTRAINT") {
                toast.error("Não é possível excluir o gênero, pois ele está associado a filmes.");
            } else {
                toast.error("Erro ao excluir o gênero.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    const LoadFillData = () => {
        return dataGeneros.map((data, index) => (
            <tr key={index}>
                <th>{data.id}</th>
                <td>{data.genero}</td>
                <td>
                    <Link className="btn btn-outline-info" to={`/generos/edit/${data.id}`} >
                        Editar
                    </Link>                    
                </td>
                <td>
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(data.id)}>
                        Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container">
            <Toaster position="top-right" richColors /> {/* Sonner Toaster */}
            <h3 className="mt-4">Lista de Gêneros</h3>

            {/* Formulário para adicionar novo gênero */}
            <form className="mb-4" onSubmit={handleAddGenero}>
                <div className="form-group row">
                    <label htmlFor="novoGenero" className="col-sm-2 col-md-1 col-form-label">Novo Gênero</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="novoGenero"
                            placeholder="Insira o nome do gênero"
                            value={novoGenero}
                            onChange={(e) => setNovoGenero(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-primary">Adicionar</button>
                    </div>
                </div>
            </form>

            {/* Tabela de gêneros */}
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Gênero</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>{LoadFillData()}</tbody>
            </table>
        </div>
    );
};

export default Generos;
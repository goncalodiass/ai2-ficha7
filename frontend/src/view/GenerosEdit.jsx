import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

const baseUrl = "http://localhost:3000";

const GenerosEdit = () => {
    const [genero, setGenero] = useState("");
    const { id } = useParams();

    useEffect(() => {
        // Busca os dados do gênero
        const fetchGenero = async () => {
            try {
                const response = await axios.get(`${baseUrl}/genero/get/${id}`);
                if (response.data.success) {
                    setGenero(response.data.data[0].genero);
                } else {
                    toast.error("Erro ao carregar os dados do gênero.");
                }
            } catch (error) {
                toast.error("Erro no servidor: " + error.message);
            }
        };

        fetchGenero();
    }, [id]);

    const handleUpdate = async () => {
        if (!genero.trim()) {
            toast.error("O nome do gênero não pode estar vazio.");
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}/genero/update/${id}`, { genero });
            if (response.data.success) {
                toast.success("Gênero atualizado com sucesso!");
            } else {
                toast.error("Erro ao atualizar o gênero.");
            }
        } catch (error) {
            toast.error("Erro no servidor: " + error.message);
        }
    };

    return (
        <div className="container">
            <Toaster position="top-right" richColors />
            <h3 className="mt-4">Editar Gênero</h3>
            <div className="form-group row mb-3">
                <label htmlFor="genero" className="col-sm-2 col-md-1 col-form-label">Gênero</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="genero"
                        placeholder="Nome do gênero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleUpdate}>
                Atualizar
            </button>
        </div>
    );
};

export default GenerosEdit;
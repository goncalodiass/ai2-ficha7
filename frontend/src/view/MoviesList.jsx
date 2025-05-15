import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Toaster, toast } from 'sonner';

const urlAPI = "http://localhost:3000/filmes/list";

const MoviesList = () => {
    const [dataMovies, setdataMovies] = useState([]);
    useEffect(() => {
        LoadMovies();
    }, []);
    function LoadMovies() {
        const url = "http://localhost:3000/filmes/list";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataMovies(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    function SendDelete(movieId) {
        // url do backend
        const baseUrl = "http://localhost:3000/filmes/delete"
        // network
        axios.post(baseUrl, {
            id: movieId
        })
            .then(response => {
                if (response.data.success) {
                    //alert("Filme deletado com sucesso!");
                    toast.success(`Filme "${movieId.titulo}" eliminado com sucesso!`);

                    LoadMovies();
                } else {
                    alert("Erro ao deletar o filme: " + res.data.message);

                }
            })
            .catch(error => {
                alert("Erro no servidor: " + error.message);
            });
    }

    function LoadFillData() {
        return dataMovies.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.título}</td>
                    <td>{data.descrição}</td>
                    <td>{data.genero.genero}</td>
                    <td>
                        <img
                            src={data.foto}
                            alt={data.título}
                            style={{ width: "75px", height: "auto" }}
                        />
                    </td>
                    <td>
                        <Link className="btn btn-outline-info" to={"filmes/edit/" + data.id} >Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => SendDelete(data.id)} // Chama a função de deletar
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    }


    return (
        <>
        <Toaster richColors position="top-right" />

        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">título</th>
                    <th scope="col">descrição</th>
                    <th scope="col">genero</th>
                    <th scope="col">foto</th>
                    <th colSpan="2">action</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData />

            </tbody>
        </table>
        </>
    );
};
export default MoviesList;
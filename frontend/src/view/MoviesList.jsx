import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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

    function LoadFillData() {
        return dataMovies.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.título}</td>
                    <td>{data.descrição}</td>
                    <td>{data.foto}</td>
                    <td>{data.genero.genero}</td>
                    <td>
                        <Link className="btn btn-outline-info" to={"filmes/edit/"+data.id} >Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <table className="table table-hover tablestriped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">título</th>
                    <th scope="col">descrição</th>
                    <th scope="col">foto</th>
                    <th scope="col">genero</th>
                    <th colSpan="2">action</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData />

            </tbody>
        </table>
    );
};
export default MoviesList;
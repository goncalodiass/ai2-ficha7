import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';

const MoviesAdd = () => {

    const [dataMovies, setdataMovies] = useState("");
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringRole, setstringRole] = useState("");
    const [selectGenero, setselectGenero] = useState("");

    return (
        <div>
            <div className="form-group row mb-3">
                <label htmlFor="title" className="col-sm-2 col-md-1 col-formlabel">Título</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                        placeholder="Title"
                        value={campTítulo} onChange={value =>
                            setcampTítulo(value.target.value)} />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="description" className="col-sm-2 col-md-1 col-formlabel">Descrição</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="description" rows="3"
                        placeholder="Uma breve descrição" value={campDescrição} onChange={(value) =>setcampDescrição(value.target.value)} />

                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="email" className="col-sm-2 col-md-1 col-formlabel">Foto</label>
                <div className="col-sm-10">
                    <input type="file" className="form-control"
                        value={campFoto} onChange={value =>
                            setcampFoto(value.target.value)} />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="role" className="col-sm-2 col-md-1 col-formlabel">Genero</label>
                <div className="col-sm-10">
                    <select id="inputState" className="form-control"
                        onChange={value => setselectGenero(value.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="1">Comédia</option>
                        <option value="5">Ação</option>
                        <option value="6">Romance</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary"
                onClick={() => SendSave()}>Save</button>
        </div>
    );
    function SendSave() {
        e.preventDefault();
        const baseUrl = "http://localhost:3000/filmes/create"
        const datapost = {
            título: campTítulo,
            descrição: campDescrição,
            foto: campFoto,
            genero: selectGenero
        }
        axios.post(baseUrl, datapost)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert(response.data.message)
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }
};
export default MoviesAdd;
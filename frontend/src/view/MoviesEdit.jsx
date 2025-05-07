import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000";

const MoviesEdit = () => {

    const [dataMovies, setdataMovies] = useState("");
    const [campTítulo, setcampTítulo] = useState("");
    const [campDescrição, setcampDescrição] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringRole, setstringRole] = useState("");
    const [selectGenero, setselectGenero] = useState("");


    const { movieId } = useParams();
    console.log(movieId);

    useEffect(() => {
        const url = baseUrl + "/filmes/get/" + movieId;
        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataMovies(data);
                    setcampTítulo(data.título);
                    setcampDescrição(data.descrição);
                    setcampPhone(data.phone);
                    setcampAddress(data.address);
                    setstringGenero(data.genero.genero);
                    setselectGenero(data.generoId);
                    console.log(JSON.stringify(data.genero.genero));
                } else {
                    alert("Error web service");
                }
            })
            .catch((error) => {
                alert("Error server: " + error);
            });
    }, []);


    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Name</label>
                    <input type="text" className="form-control" placeholder="Name"
                        value={campTítulo} onChange={(value) => setcampTítulo(value.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                        value={campDescrição} onChange={(value) => setcampDescrição(value.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Role</label>
                    <select id="inputState" className="form-control"
                        onChange={(value) => setselectGenero(value.target.value)}>
                        <option value={selectRole}>{stringRole}</option>
                        <option value="1">Comédia</option>
                        <option value="5">Ação</option>
                        <option value="6">Romance</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary"
                onClick={() => SendUpdate()}>Update</button>
        </div>
    );
    function SendUpdate() {
        // url de backend
        const url = baseUrl + "/filmes/update/" + movieId
        const datapost = {
            título: campTítulo,
            descrição: campDescrição,
            foto: campFoto,
            genero: selectGenero
        }
        axios.post(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }
};
export default MoviesEdit;
import axios from 'axios';


export const fetchPerson = () => {
    return axios.get(`http://localhost:8080/person`);
}

export const fetchPersonById = (id) => {
    return axios.get(`http://localhost:8080/person/${id}`);
}

export const createPerson = (body) => {
    return axios.post(`http://localhost:8080/person`, body);
}

export const updatePerson = (body) => {
    //return axios.put(`http://cors-anywhere.herokuapp.com//localhost:8080/person`, body);
    return axios.put(`http://localhost:8080/person`, body);
}

export const deletePerson = (id) => {
    return axios.delete(`http://localhost:8080/person/${id}`);
}